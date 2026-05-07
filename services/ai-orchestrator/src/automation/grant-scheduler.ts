import cron from 'node-cron';
import GeminiIntegration from '../integrations/gemini.js';
import BrowserAutomation, { GrantFormData } from './browser-automation.js';
import NotificationService, { NotificationConfig } from '../lib/notification-service.js';

export interface ScheduledGrant {
  id: string;
  grantName: string;
  skipUrl: string;
  deadline: Date;
  scheduledSubmission: Date;
  autoSubmit: boolean;
  formData: GrantFormData;
  status: 'scheduled' | 'running' | 'completed' | 'failed';
}

export interface GrantSchedulerConfig {
  geminiApiKey: string;
  strapiUrl: string;
  strapiToken: string;
  skipCredentials: {
    username: string;
    password: string;
  };
  notifications?: NotificationConfig;
}

export class GrantScheduler {
  private gemini: GeminiIntegration;
  private automation: BrowserAutomation;
  private config: GrantSchedulerConfig;
  private scheduledJobs: Map<string, cron.ScheduledTask> = new Map();
  private grants: Map<string, ScheduledGrant> = new Map();
  private notificationService?: NotificationService;

  constructor(config: GrantSchedulerConfig) {
    this.config = config;
    this.gemini = new GeminiIntegration({ apiKey: config.geminiApiKey });
    this.automation = new BrowserAutomation();

    if (config.notifications) {
      this.notificationService = new NotificationService(config.notifications);
    }
  }

  async scheduleGrant(grant: ScheduledGrant): Promise<void> {
    if (!grant.autoSubmit) {
      console.log(`Grant ${grant.id} not set for auto-submit`);
      return;
    }

    const submissionDate = new Date(grant.scheduledSubmission);
    const cronExpression = this.dateToCron(submissionDate);

    console.log(`Scheduling grant ${grant.grantName} for ${submissionDate.toISOString()}`);
    console.log(`Cron expression: ${cronExpression}`);

    const task = cron.schedule(cronExpression, async () => {
      console.log(`Executing scheduled grant submission: ${grant.grantName}`);
      await this.submitGrant(grant.id);
    });

    this.scheduledJobs.set(grant.id, task);
    this.grants.set(grant.id, { ...grant, status: 'scheduled' });
  }

  async submitGrant(grantId: string): Promise<void> {
    const grant = this.grants.get(grantId);
    if (!grant) {
      console.error(`Grant ${grantId} not found`);
      return;
    }

    try {
      // Update status
      grant.status = 'running';
      this.grants.set(grantId, grant);

      // Update Strapi
      await this.updateGrantStatus(grantId, 'submitting');

      // Submit via browser automation
      const result = await this.automation.submitToSkipPlatform(
        grant.skipUrl,
        this.config.skipCredentials,
        grant.formData
      );

      if (result.success) {
        grant.status = 'completed';
        await this.updateGrantStatus(grantId, 'submitted', {
          submittedAt: new Date().toISOString(),
          submissionId: result.submissionId,
          screenshotPath: result.screenshotPath,
        });

        console.log(`Grant ${grant.grantName} submitted successfully`);

        // Send success notification
        if (this.notificationService) {
          await this.notificationService.sendGrantSubmissionSuccess(
            grant.grantName,
            result.submissionId || 'N/A',
            grant.formData.contactEmail
          );
        }
      } else {
        grant.status = 'failed';
        await this.updateGrantStatus(grantId, 'failed', {
          errors: result.errors,
          screenshotPath: result.screenshotPath,
        });

        console.error(`Grant ${grant.grantName} submission failed:`, result.errors);

        // Send failure notification
        if (this.notificationService) {
          await this.notificationService.sendGrantSubmissionFailed(
            grant.grantName,
            result.errors || ['Unknown error'],
            grant.formData.contactEmail
          );
        }
      }

      // Remove from scheduled jobs
      const task = this.scheduledJobs.get(grantId);
      if (task) {
        task.stop();
        this.scheduledJobs.delete(grantId);
      }

      this.grants.set(grantId, grant);
    } catch (error) {
      console.error(`Error submitting grant ${grantId}:`, error);
      grant.status = 'failed';
      this.grants.set(grantId, grant);

      await this.updateGrantStatus(grantId, 'failed', {
        errors: [String(error)],
      });
    }
  }

  async cancelScheduledGrant(grantId: string): Promise<void> {
    const task = this.scheduledJobs.get(grantId);
    if (task) {
      task.stop();
      this.scheduledJobs.delete(grantId);
      console.log(`Cancelled scheduled grant: ${grantId}`);
    }

    const grant = this.grants.get(grantId);
    if (grant) {
      grant.status = 'failed';
      this.grants.set(grantId, grant);
    }
  }

  async runDeadlineChecker(): Promise<void> {
    // Run every day at 9 AM to check for approaching deadlines
    cron.schedule('0 9 * * *', async () => {
      console.log('Running deadline checker...');

      const grants = await this.fetchGrantsFromStrapi();

      for (const grant of grants) {
        const deadline = new Date(grant.deadline);
        const now = new Date();
        const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        // Alert if deadline is within 7 days
        if (daysUntilDeadline <= 7 && daysUntilDeadline > 0) {
          console.log(`ALERT: Grant "${grant.grantName}" deadline in ${daysUntilDeadline} days`);
          await this.sendDeadlineAlert(grant, daysUntilDeadline);
        }

        // Auto-schedule if not already scheduled and deadline is within 30 days
        if (daysUntilDeadline <= 30 && grant.autoSubmit && !this.scheduledJobs.has(grant.id)) {
          const submissionDate = new Date(deadline);
          submissionDate.setDate(submissionDate.getDate() - 2); // Submit 2 days before deadline

          await this.scheduleGrant({
            ...grant,
            scheduledSubmission: submissionDate,
          });
        }
      }
    });
  }

  private dateToCron(date: Date): string {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return `${minute} ${hour} ${day} ${month} *`;
  }

  private async updateGrantStatus(
    grantId: string,
    status: string,
    additionalData?: Record<string, any>
  ): Promise<void> {
    try {
      const response = await fetch(`${this.config.strapiUrl}/api/grant-applications/${grantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.strapiToken}`,
        },
        body: JSON.stringify({
          data: {
            status,
            ...additionalData,
            automationLogs: {
              timestamp: new Date().toISOString(),
              status,
              ...additionalData,
            },
          },
        }),
      });

      if (!response.ok) {
        console.error('Failed to update grant status in Strapi');
      }
    } catch (error) {
      console.error('Error updating grant status:', error);
    }
  }

  private async fetchGrantsFromStrapi(): Promise<ScheduledGrant[]> {
    try {
      const response = await fetch(`${this.config.strapiUrl}/api/grant-applications?filters[autoSubmit][$eq]=true`, {
        headers: {
          Authorization: `Bearer ${this.config.strapiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch grants from Strapi');
      }

      const data = await response.json();
      return data.data.map((item: any) => ({
        id: item.id,
        grantName: item.attributes.grantName,
        skipUrl: item.attributes.skipPlatformUrl,
        deadline: new Date(item.attributes.deadline),
        scheduledSubmission: new Date(item.attributes.scheduledSubmission),
        autoSubmit: item.attributes.autoSubmit,
        formData: {
          organizationName: 'New World Kids',
          contactEmail: item.attributes.contactEmail,
          contactPerson: item.attributes.contactPerson,
          fundingAmount: item.attributes.fundingAmount,
          projectDescription: item.attributes.description,
          letterOfIntent: item.attributes.draftApplication,
        },
        status: 'scheduled',
      }));
    } catch (error) {
      console.error('Error fetching grants from Strapi:', error);
      return [];
    }
  }

  private async sendDeadlineAlert(grant: ScheduledGrant, daysRemaining: number): Promise<void> {
    console.log(`[ALERT] Grant "${grant.grantName}" deadline in ${daysRemaining} days`);

    if (this.notificationService) {
      await this.notificationService.sendGrantDeadlineAlert(
        grant.grantName,
        daysRemaining,
        grant.formData.contactEmail
      );
    }
  }

  async start(): Promise<void> {
    console.log('Starting Grant Scheduler...');
    await this.runDeadlineChecker();
    console.log('Grant Scheduler started successfully');
  }

  async stop(): Promise<void> {
    console.log('Stopping Grant Scheduler...');

    // Stop all scheduled jobs
    for (const [id, task] of this.scheduledJobs.entries()) {
      task.stop();
      console.log(`Stopped job: ${id}`);
    }

    this.scheduledJobs.clear();
    console.log('Grant Scheduler stopped');
  }
}

export default GrantScheduler;
