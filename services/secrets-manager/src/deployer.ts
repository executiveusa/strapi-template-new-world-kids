/**
 * Deploy secrets to Vercel and Coolify
 */

/**
 * Execute shell command asynchronously
 */
function execAsync(command: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { exec } = require('child_process');
    exec(command, (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

export class SecretsDeployer {
  async deployToVercel(
    keys: string | string[],
    environment: string,
    options?: { projectId?: string }
  ): Promise<{ count: number; message: string }> {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    const vercelEnv = environment === 'development' ? 'development' : environment === 'staging' ? 'preview' : 'production';

    try {
      for (const key of keyArray) {
        const cmd = `vercel env add ${key} ${vercelEnv}${options?.projectId ? ` --scope ${options.projectId}` : ''}`;
        await execAsync(cmd);
      }

      return {
        count: keyArray.length,
        message: `Successfully deployed ${keyArray.length} secrets to Vercel ${vercelEnv}`,
      };
    } catch (error: any) {
      throw new Error(`Vercel deployment failed: ${error.message}`);
    }
  }

  async deployToCoolify(
    keys: string | string[],
    environment: string,
    options?: { serviceId?: string; coolifyUrl?: string }
  ): Promise<{ count: number; message: string }> {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    const coolifyUrl = options?.coolifyUrl || process.env.COOLIFY_URL;
    const coolifyToken = process.env.COOLIFY_TOKEN;

    if (!coolifyUrl || !coolifyToken) {
      throw new Error('COOLIFY_URL and COOLIFY_TOKEN must be set');
    }

    try {
      // Coolify uses a webhook or API to update env vars
      // This is a simplified example - adjust based on your Coolify setup
      const response = await fetch(`${coolifyUrl}/api/v1/services/${options?.serviceId}/env`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${coolifyToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          environment,
          variables: keyArray.map(key => ({ key, value: process.env[key] })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Coolify API error: ${response.statusText}`);
      }

      return {
        count: keyArray.length,
        message: `Successfully deployed ${keyArray.length} secrets to Coolify ${environment}`,
      };
    } catch (error: any) {
      throw new Error(`Coolify deployment failed: ${error.message}`);
    }
  }
}
