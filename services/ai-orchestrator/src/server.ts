import express from 'express';
import cors from 'cors';
import AIOrchestrator, { AgentTask } from './agents/orchestrator.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize orchestrator
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'ai-orchestrator', version: '1.0.0' });
});

// Agent status endpoint
app.get('/api/agents/status', async (req, res) => {
  try {
    const status = await orchestrator.getAgentStatus();
    res.json(status);
  } catch (error) {
    console.error('Error fetching agent status:', error);
    res.status(500).json({ error: 'Failed to fetch agent status', agents: [] });
  }
});

// Submit task endpoint
app.post('/api/tasks', async (req, res) => {
  try {
    const { type, priority, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Task type and data are required' });
    }

    const taskId = await orchestrator.submitTask({
      type: type as AgentTask['type'],
      priority: priority || 'medium',
      data,
    });

    res.json({ taskId, message: 'Task submitted successfully' });
  } catch (error) {
    console.error('Error submitting task:', error);
    res.status(500).json({ error: 'Failed to submit task' });
  }
});

// Get task status
app.get('/api/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await orchestrator.getTaskStatus(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Get insights endpoint
app.get('/api/insights', async (req, res) => {
  try {
    const insights = await orchestrator.getInsights();
    res.json({ insights });
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(200).json({ insights: [] });
  }
});

// Get orchestrator memory
app.get('/api/memory', async (req, res) => {
  try {
    const memory = await orchestrator.getMemory();
    res.json(memory);
  } catch (error) {
    console.error('Error fetching memory:', error);
    res.status(500).json({ error: 'Failed to fetch memory' });
  }
});

// Update nonprofit profile
app.post('/api/memory/profile', async (req, res) => {
  try {
    const profile = req.body;
    await orchestrator.updateNonprofitProfile(profile);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Record feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { taskId, feedback, rating } = req.body;
    await orchestrator.recordFeedback(taskId, feedback, rating);
    res.json({ message: 'Feedback recorded successfully' });
  } catch (error) {
    console.error('Error recording feedback:', error);
    res.status(500).json({ error: 'Failed to record feedback' });
  }
});

// Start server
async function startServer() {
  try {
    console.log('🤖 AI Orchestrator HTTP Server');
    console.log('==============================\n');

    // Start orchestrator
    await orchestrator.start();

    // Start HTTP server
    app.listen(port, () => {
      console.log(`\n🌐 HTTP Server listening on port ${port}`);
      console.log(`📡 API endpoints available at http://localhost:${port}`);
      console.log('\n✨ Service is running. Press Ctrl+C to stop.\n');
    });

    // Graceful shutdown
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
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
