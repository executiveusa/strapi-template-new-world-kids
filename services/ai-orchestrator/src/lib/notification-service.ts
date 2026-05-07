import nodemailer from 'nodemailer';

export interface NotificationConfig {
  email?: {
    service: string;
    user: string;
    pass: string;
    from: string;
  };
  slack?: {
    webhookUrl: string;
  };
}

export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  html?: string;
}

export class NotificationService {
  private config: NotificationConfig;
  private emailTransporter?: nodemailer.Transporter;

  constructor(config: NotificationConfig) {
    this.config = config;

    if (config.email) {
      this.emailTransporter = nodemailer.createTransport({
        service: config.email.service,
        auth: {
          user: config.email.user,
          pass: config.email.pass,
        },
      });
    }
  }

  async sendEmail(notification: EmailNotification): Promise<boolean> {
    if (!this.emailTransporter || !this.config.email) {
      console.warn('Email service not configured');
      return false;
    }

    try {
      const info = await this.emailTransporter.sendMail({
        from: this.config.email.from,
        to: notification.to,
        subject: notification.subject,
        text: notification.body,
        html: notification.html || notification.body,
      });

      console.log('Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendSlackNotification(message: string, channel?: string): Promise<boolean> {
    if (!this.config.slack?.webhookUrl) {
      console.warn('Slack service not configured');
      return false;
    }

    try {
      const response = await fetch(this.config.slack.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: message,
          channel: channel,
        }),
      });

      if (!response.ok) {
        throw new Error('Slack notification failed');
      }

      console.log('Slack notification sent');
      return true;
    } catch (error) {
      console.error('Error sending Slack notification:', error);
      return false;
    }
  }

  async sendGrantDeadlineAlert(
    grantName: string,
    daysRemaining: number,
    contactEmail: string
  ): Promise<void> {
    const subject = `Grant Deadline Alert: ${grantName}`;
    const body = `
Hello,

This is a reminder that the deadline for "${grantName}" is in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}.

Please review the grant application and ensure all materials are ready for submission.

Best regards,
Grant Hunter AI Agent
New World Kids
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9a84c;">Grant Deadline Alert</h2>
        <p>Hello,</p>
        <p>This is a reminder that the deadline for <strong>"${grantName}"</strong> is in <strong>${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}</strong>.</p>
        <p>Please review the grant application and ensure all materials are ready for submission.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Best regards,<br>
          Grant Hunter AI Agent<br>
          New World Kids
        </p>
      </div>
    `;

    await this.sendEmail({
      to: contactEmail,
      subject,
      body,
      html,
    });

    // Also send Slack notification if configured
    await this.sendSlackNotification(
      `🚨 Grant Deadline Alert: "${grantName}" deadline in ${daysRemaining} days`
    );
  }

  async sendGrantSubmissionSuccess(
    grantName: string,
    submissionId: string,
    contactEmail: string
  ): Promise<void> {
    const subject = `Grant Submitted Successfully: ${grantName}`;
    const body = `
Hello,

Great news! The grant application for "${grantName}" has been submitted successfully.

Submission ID: ${submissionId}
Submitted at: ${new Date().toLocaleString()}

The Grant Hunter AI agent will continue to monitor the application status.

Best regards,
Grant Hunter AI Agent
New World Kids
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">✅ Grant Submitted Successfully</h2>
        <p>Hello,</p>
        <p>Great news! The grant application for <strong>"${grantName}"</strong> has been submitted successfully.</p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Submission ID:</strong> ${submissionId}</p>
          <p style="margin: 5px 0;"><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p>The Grant Hunter AI agent will continue to monitor the application status.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Best regards,<br>
          Grant Hunter AI Agent<br>
          New World Kids
        </p>
      </div>
    `;

    await this.sendEmail({
      to: contactEmail,
      subject,
      body,
      html,
    });

    await this.sendSlackNotification(
      `✅ Grant submitted successfully: "${grantName}" (ID: ${submissionId})`
    );
  }

  async sendGrantSubmissionFailed(
    grantName: string,
    errors: string[],
    contactEmail: string
  ): Promise<void> {
    const subject = `Grant Submission Failed: ${grantName}`;
    const body = `
Hello,

Unfortunately, the automated submission for "${grantName}" encountered errors and could not be completed.

Errors:
${errors.map((e, i) => `${i + 1}. ${e}`).join('\n')}

Please review the grant application manually and submit it before the deadline.

Best regards,
Grant Hunter AI Agent
New World Kids
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">⚠️ Grant Submission Failed</h2>
        <p>Hello,</p>
        <p>Unfortunately, the automated submission for <strong>"${grantName}"</strong> encountered errors and could not be completed.</p>
        <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Errors:</strong></p>
          <ul style="margin: 10px 0;">
            ${errors.map((e) => `<li>${e}</li>`).join('')}
          </ul>
        </div>
        <p>Please review the grant application manually and submit it before the deadline.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Best regards,<br>
          Grant Hunter AI Agent<br>
          New World Kids
        </p>
      </div>
    `;

    await this.sendEmail({
      to: contactEmail,
      subject,
      body,
      html,
    });

    await this.sendSlackNotification(
      `⚠️ Grant submission failed: "${grantName}" - ${errors.length} error(s)`
    );
  }
}

export default NotificationService;
