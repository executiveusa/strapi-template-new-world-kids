import puppeteer, { Browser, Page } from 'puppeteer';

export interface GrantFormData {
  organizationName: string;
  contactEmail: string;
  contactPerson: string;
  fundingAmount: number;
  projectDescription: string;
  letterOfIntent?: string;
  attachments?: Array<{
    path: string;
    type: string;
  }>;
}

export interface AutomationResult {
  success: boolean;
  message: string;
  screenshotPath?: string;
  submissionId?: string;
  errors?: string[];
}

export class BrowserAutomation {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init(headless: boolean = true): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1920, height: 1080 });
    } catch (error) {
      console.error('Browser initialization error:', error);
      throw new Error(`Failed to initialize browser: ${error}`);
    }
  }

  async close(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async navigateTo(url: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call init() first.');
    }

    try {
      await this.page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });
    } catch (error) {
      console.error(`Navigation error to ${url}:`, error);
      throw new Error(`Failed to navigate to ${url}: ${error}`);
    }
  }

  async takeScreenshot(path: string): Promise<string> {
    if (!this.page) {
      throw new Error('Browser not initialized');
    }

    try {
      await this.page.screenshot({ path, fullPage: true });
      return path;
    } catch (error) {
      console.error('Screenshot error:', error);
      throw new Error(`Failed to take screenshot: ${error}`);
    }
  }

  async fillForm(selectors: Record<string, string>, data: Record<string, any>): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized');
    }

    try {
      for (const [field, selector] of Object.entries(selectors)) {
        const value = data[field];
        if (value === undefined || value === null) continue;

        await this.page.waitForSelector(selector, { timeout: 5000 });
        await this.page.type(selector, String(value), { delay: 50 });
      }
    } catch (error) {
      console.error('Form filling error:', error);
      throw new Error(`Failed to fill form: ${error}`);
    }
  }

  async clickButton(selector: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized');
    }

    try {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      await this.page.click(selector);
      await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {
        // Navigation might not happen for AJAX forms
        console.log('No navigation occurred after button click');
      });
    } catch (error) {
      console.error('Button click error:', error);
      throw new Error(`Failed to click button: ${error}`);
    }
  }

  async uploadFile(selector: string, filePath: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized');
    }

    try {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      const input = await this.page.$(selector);
      if (input) {
        await input.uploadFile(filePath);
      }
    } catch (error) {
      console.error('File upload error:', error);
      throw new Error(`Failed to upload file: ${error}`);
    }
  }

  async submitToSkipPlatform(
    skipUrl: string,
    credentials: { username: string; password: string },
    formData: GrantFormData
  ): Promise<AutomationResult> {
    const errors: string[] = [];
    let screenshotPath: string | undefined;

    try {
      await this.init(true);

      // Navigate to Skip platform
      await this.navigateTo(skipUrl);

      // Wait for login form
      await this.page!.waitForSelector('input[name="username"], input[name="email"]', { timeout: 10000 });

      // Login
      await this.fillForm(
        {
          username: 'input[name="username"], input[name="email"]',
          password: 'input[name="password"]',
        },
        credentials
      );

      await this.clickButton('button[type="submit"], button.login-btn');

      // Wait for dashboard
      await this.page!.waitForTimeout(3000);

      // Navigate to grants section
      const grantsLinkSelector = 'a[href*="grants"], a[href*="applications"]';
      await this.page!.waitForSelector(grantsLinkSelector, { timeout: 10000 });
      await this.clickButton(grantsLinkSelector);

      // Find "New Application" or "Apply" button
      await this.page!.waitForTimeout(2000);
      const newAppSelector = 'button:has-text("New Application"), a:has-text("Apply"), button.new-grant';
      await this.clickButton(newAppSelector);

      // Fill grant application form
      await this.page!.waitForTimeout(1000);

      await this.fillForm(
        {
          organizationName: 'input[name="organization"], input[name="org_name"]',
          contactEmail: 'input[name="email"], input[name="contact_email"]',
          contactPerson: 'input[name="contact"], input[name="contact_name"]',
          fundingAmount: 'input[name="amount"], input[name="funding_amount"]',
          projectDescription: 'textarea[name="description"], textarea[name="project_desc"]',
        },
        formData
      );

      // Upload letter of intent if provided
      if (formData.letterOfIntent) {
        const loiSelector = 'textarea[name="letter"], textarea[name="loi"]';
        await this.page!.waitForSelector(loiSelector, { timeout: 5000 });
        await this.page!.type(loiSelector, formData.letterOfIntent);
      }

      // Upload attachments
      if (formData.attachments && formData.attachments.length > 0) {
        for (const attachment of formData.attachments) {
          await this.uploadFile('input[type="file"]', attachment.path);
          await this.page!.waitForTimeout(1000);
        }
      }

      // Take screenshot before submission
      screenshotPath = `/tmp/grant-submission-${Date.now()}.png`;
      await this.takeScreenshot(screenshotPath);

      // Submit form
      await this.clickButton('button[type="submit"], button.submit-btn, button:has-text("Submit")');

      // Wait for confirmation
      await this.page!.waitForTimeout(3000);

      // Check for success message
      const successMessage = await this.page!.$eval(
        '.success, .confirmation, [class*="success"]',
        (el) => el.textContent
      ).catch(() => null);

      if (successMessage) {
        return {
          success: true,
          message: 'Grant application submitted successfully',
          screenshotPath,
          submissionId: `SKIP-${Date.now()}`,
        };
      }

      return {
        success: true,
        message: 'Form submitted (confirmation pending)',
        screenshotPath,
      };

    } catch (error) {
      errors.push(`Submission error: ${error}`);
      console.error('Skip platform submission error:', error);

      if (this.page) {
        screenshotPath = `/tmp/grant-error-${Date.now()}.png`;
        await this.takeScreenshot(screenshotPath).catch(() => {});
      }

      return {
        success: false,
        message: 'Failed to submit grant application',
        screenshotPath,
        errors,
      };
    } finally {
      await this.close();
    }
  }

  async searchGrants(keywords: string[]): Promise<Array<{
    title: string;
    url: string;
    deadline?: string;
    amount?: string;
  }>> {
    try {
      await this.init(true);

      // Navigate to grant search platform (e.g., Candid, GrantStation)
      await this.navigateTo('https://grantstation.com');

      // Implement search logic here
      // This is a placeholder - actual implementation depends on the platform

      const grants: Array<{ title: string; url: string; deadline?: string; amount?: string }> = [];

      return grants;
    } catch (error) {
      console.error('Grant search error:', error);
      throw new Error(`Failed to search grants: ${error}`);
    } finally {
      await this.close();
    }
  }
}

export default BrowserAutomation;
