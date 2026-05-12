import AIOrchestrator from './agents/orchestrator.js';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
  strapiToken: process.env.STRAPI_TOKEN || '',
  hermesUrl: process.env.HERMES_URL || 'http://localhost:3001',
  skipCredentials: {
    username: process.env.SKIP_USERNAME || '',
    password: process.env.SKIP_PASSWORD || '',
  },
};

const orchestrator = new AIOrchestrator(config);

async function main() {
  try {
    console.log('🤖 AI Orchestrator Service');
    console.log('==========================\n');

    await orchestrator.start();

    // Keep service running
    process.on('SIGINT', async () => {
      console.log('\n\nReceived SIGINT, shutting down gracefully...');
      await orchestrator.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n\nReceived SIGTERM, shutting down gracefully...');
      await orchestrator.stop();
      process.exit(0);
    });

    console.log('\n✨ Service is running. Press Ctrl+C to stop.\n');
  } catch (error) {
    console.error('Failed to start AI Orchestrator:', error);
    process.exit(1);
  }
}

main();

export { orchestrator };
export default AIOrchestrator;
