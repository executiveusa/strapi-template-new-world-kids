import GeminiIntegration from '../integrations/gemini.js';
import GrantScheduler from '../automation/grant-scheduler.js';
import BrowserAutomation from '../automation/browser-automation.js';

export interface OrchestratorConfig {
  geminiApiKey: string;
  strapiUrl: string;
  strapiToken: string;
  hermesUrl?: string;
  skipCredentials: {
    username: string;
    password: string;
  };
}

export interface AgentTask {
  id: string;
  type: 'grant-analysis' | 'grant-application' | 'timeline-enhancement' | 'content-generation';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  data: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface AgentMemory {
  nonprofitProfile: {
    name: string;
    mission: string;
    achievements: string[];
    targetPopulation: string;
    pastGrants: Array<{
      name: string;
      amount: number;
      success: boolean;
    }>;
  };
  learnings: {
    successfulStrategies: string[];
    grantsToAvoid: string[];
    bestPractices: string[];
  };
  interactions: Array<{
    timestamp: Date;
    type: string;
    input: any;
    output: any;
    feedback?: string;
  }>;
}

export class AIOrchestrator {
  private gemini: GeminiIntegration;
  private scheduler: GrantScheduler;
  private automation: BrowserAutomation;
  private config: OrchestratorConfig;
  private tasks: Map<string, AgentTask> = new Map();
  private memory: AgentMemory;

  constructor(config: OrchestratorConfig) {
    this.config = config;
    this.gemini = new GeminiIntegration({ apiKey: config.geminiApiKey });
    this.scheduler = new GrantScheduler({
      geminiApiKey: config.geminiApiKey,
      strapiUrl: config.strapiUrl,
      strapiToken: config.strapiToken,
      skipCredentials: config.skipCredentials,
    });
    this.automation = new BrowserAutomation();

    // Initialize memory
    this.memory = this.initializeMemory();
  }

  private initializeMemory(): AgentMemory {
    return {
      nonprofitProfile: {
        name: 'New World Kids',
        mission: 'Empowering children through education and technology',
        achievements: [],
        targetPopulation: 'Underserved youth ages 5-18',
        pastGrants: [],
      },
      learnings: {
        successfulStrategies: [],
        grantsToAvoid: [],
        bestPractices: [],
      },
      interactions: [],
    };
  }

  async start(): Promise<void> {
    console.log('🚀 Starting AI Orchestrator...');

    // Start grant scheduler
    await this.scheduler.start();

    // Load nonprofit profile from Strapi
    await this.loadNonprofitProfile();

    console.log('✅ AI Orchestrator started successfully');
  }

  async stop(): Promise<void> {
    console.log('🛑 Stopping AI Orchestrator...');
    await this.scheduler.stop();
    console.log('✅ AI Orchestrator stopped');
  }

  async submitTask(task: Omit<AgentTask, 'id' | 'status' | 'createdAt'>): Promise<string> {
    const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const fullTask: AgentTask = {
      ...task,
      id: taskId,
      status: 'pending',
      createdAt: new Date(),
    };

    this.tasks.set(taskId, fullTask);

    // Process task asynchronously
    this.processTask(taskId).catch((error) => {
      console.error(`Error processing task ${taskId}:`, error);
      fullTask.status = 'failed';
      fullTask.error = String(error);
      this.tasks.set(taskId, fullTask);
    });

    return taskId;
  }

  private async processTask(taskId: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = 'processing';
    this.tasks.set(taskId, task);

    try {
      let result: any;

      switch (task.type) {
        case 'grant-analysis':
          result = await this.analyzeGrant(task.data);
          break;

        case 'grant-application':
          result = await this.generateGrantApplication(task.data);
          break;

        case 'timeline-enhancement':
          result = await this.enhanceTimeline(task.data);
          break;

        case 'content-generation':
          result = await this.generateContent(task.data);
          break;

        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }

      task.status = 'completed';
      task.result = result;
      task.completedAt = new Date();

      // Record interaction in memory
      this.memory.interactions.push({
        timestamp: new Date(),
        type: task.type,
        input: task.data,
        output: result,
      });

      this.tasks.set(taskId, task);
    } catch (error) {
      task.status = 'failed';
      task.error = String(error);
      this.tasks.set(taskId, task);
      throw error;
    }
  }

  async analyzeGrant(data: {
    grantDescription: string;
    grantUrl: string;
    deadline: string;
  }): Promise<{
    fitScore: number;
    reasoning: string;
    recommendations: string[];
    shouldApply: boolean;
  }> {
    console.log(`Analyzing grant: ${data.grantUrl}`);

    const analysis = await this.gemini.analyzeGrantFit(
      data.grantDescription,
      this.memory.nonprofitProfile.mission,
      this.memory.nonprofitProfile.achievements
    );

    const shouldApply = analysis.fitScore >= 60;

    // Learn from analysis
    if (shouldApply) {
      this.memory.learnings.successfulStrategies.push(
        `Grant fit score ${analysis.fitScore}: ${analysis.reasoning.substring(0, 100)}`
      );
    } else {
      this.memory.learnings.grantsToAvoid.push(
        `Low fit (${analysis.fitScore}): ${data.grantDescription.substring(0, 100)}`
      );
    }

    return {
      ...analysis,
      shouldApply,
    };
  }

  async generateGrantApplication(data: {
    grantName: string;
    requirements: string;
    fundingAmount: number;
  }): Promise<{
    letterOfIntent: string;
    fullApplication?: string;
    keyPoints: string[];
  }> {
    console.log(`Generating grant application for: ${data.grantName}`);

    const application = await this.gemini.draftGrantApplication({
      grantName: data.grantName,
      requirements: data.requirements,
      fundingAmount: data.fundingAmount,
      nonprofitInfo: this.memory.nonprofitProfile,
    });

    // Store successful pattern
    this.memory.learnings.bestPractices.push(
      `Generated application for ${data.grantName} with key points: ${application.keyPoints.join(', ')}`
    );

    return application;
  }

  async enhanceTimeline(data: {
    eventId: string;
    description: string;
    images?: string[];
    videos?: string[];
  }): Promise<{
    suggestedTitle: string;
    enhancedDescription: string;
    tags: string[];
    category: string;
  }> {
    console.log(`Enhancing timeline event: ${data.eventId}`);

    const enhanced = await this.gemini.analyzeTimelineContent({
      description: data.description,
      images: data.images,
      videos: data.videos,
    });

    return enhanced;
  }

  async generateContent(data: {
    type: 'blog-post' | 'social-media' | 'newsletter';
    topic: string;
    tone?: string;
  }): Promise<{
    content: string;
    suggestions: string[];
  }> {
    console.log(`Generating ${data.type} content for topic: ${data.topic}`);

    const tone = data.tone || 'professional and inspiring';
    const prompt = `
Generate ${data.type} content for a nonprofit organization.

Organization: ${this.memory.nonprofitProfile.name}
Mission: ${this.memory.nonprofitProfile.mission}
Topic: ${data.topic}
Tone: ${tone}

Provide:
1. Complete content ready to publish
2. SEO/engagement suggestions

Format as JSON with keys: content, suggestions (array)
`;

    const result = await this.gemini.generateText(prompt);

    try {
      const parsed = JSON.parse(result.text);
      return {
        content: parsed.content || result.text,
        suggestions: parsed.suggestions || [],
      };
    } catch {
      return {
        content: result.text,
        suggestions: [],
      };
    }
  }

  async consultHermes(question: string): Promise<string> {
    // Integration with existing Hermes system
    if (!this.config.hermesUrl) {
      return 'Hermes integration not configured';
    }

    try {
      const response = await fetch(`${this.config.hermesUrl}/api/consult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, context: this.memory }),
      });

      if (!response.ok) {
        throw new Error('Hermes consultation failed');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error consulting Hermes:', error);
      return `Hermes unavailable: ${error}`;
    }
  }

  async getTaskStatus(taskId: string): Promise<AgentTask | null> {
    return this.tasks.get(taskId) || null;
  }

  async getAllTasks(): Promise<AgentTask[]> {
    return Array.from(this.tasks.values());
  }

  getMemory(): AgentMemory {
    return this.memory;
  }

  async updateNonprofitProfile(updates: Partial<AgentMemory['nonprofitProfile']>): Promise<void> {
    this.memory.nonprofitProfile = {
      ...this.memory.nonprofitProfile,
      ...updates,
    };

    // Persist to storage
    await this.saveMemoryToStrapi();
  }

  private async loadNonprofitProfile(): Promise<void> {
    // Load from Strapi or config
    console.log('Loading nonprofit profile...');
    // Implementation depends on Strapi schema
  }

  private async saveMemoryToStrapi(): Promise<void> {
    // Save memory/learnings to Strapi for persistence
    console.log('Saving agent memory...');
    // Implementation depends on Strapi schema
  }

  async getAgentStatus(): Promise<{
    agents: Array<{
      name: string;
      status: 'active' | 'idle' | 'error';
      lastActivity: string;
      tasksProcessed: number;
      uptime: number;
    }>;
  }> {
    const tasks = Array.from(this.tasks.values());
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const processingTasks = tasks.filter((t) => t.status === 'processing').length;
    const failedTasks = tasks.filter((t) => t.status === 'failed').length;

    return {
      agents: [
        {
          name: 'Hermes - Mission Operator',
          status: processingTasks > 0 ? 'active' : 'idle',
          lastActivity: tasks.length > 0 ? new Date().toISOString() : 'Never',
          tasksProcessed: completedTasks,
          uptime: process.uptime(),
        },
        {
          name: 'Grant Hunter - Funding Strategy',
          status: processingTasks > 0 ? 'active' : 'idle',
          lastActivity: tasks.length > 0 ? new Date().toISOString() : 'Never',
          tasksProcessed: completedTasks,
          uptime: process.uptime(),
        },
        {
          name: 'Content Engine - Publishing',
          status: 'idle',
          lastActivity: new Date().toISOString(),
          tasksProcessed: completedTasks,
          uptime: process.uptime(),
        },
        {
          name: 'Trust Steward - Verification',
          status: 'idle',
          lastActivity: new Date().toISOString(),
          tasksProcessed: 0,
          uptime: process.uptime(),
        },
      ],
    };
  }

  async getInsights(): Promise<
    Array<{
      id: string;
      type: 'success' | 'warning' | 'info';
      category: 'grants' | 'timeline' | 'content' | 'general';
      title: string;
      description: string;
      timestamp: string;
      actionable: boolean;
      action?: string;
    }>
  > {
    const insights = [];

    // Grant insights
    const grantTasks = Array.from(this.tasks.values()).filter(
      (t) => t.type === 'grant-analysis' || t.type === 'grant-application'
    );
    const successfulGrants = grantTasks.filter(
      (t) => t.status === 'completed' && t.result?.shouldApply
    ).length;

    if (successfulGrants > 0) {
      insights.push({
        id: 'grant-success',
        type: 'success' as const,
        category: 'grants' as const,
        title: `${successfulGrants} High-Fit Grants Identified`,
        description: `The Grant Hunter agent has identified ${successfulGrants} grants with a fit score above 60%.`,
        timestamp: new Date().toISOString(),
        actionable: true,
        action: 'Review and prioritize grant applications',
      });
    }

    // Memory insights
    if (this.memory.learnings.successfulStrategies.length > 5) {
      insights.push({
        id: 'learning-milestone',
        type: 'info' as const,
        category: 'general' as const,
        title: 'AI Learning Progress',
        description: `The system has learned from ${this.memory.learnings.successfulStrategies.length} successful grant strategies.`,
        timestamp: new Date().toISOString(),
        actionable: false,
      });
    }

    // Timeline insights
    const timelineTasks = Array.from(this.tasks.values()).filter(
      (t) => t.type === 'timeline-enhancement'
    );
    if (timelineTasks.length > 0) {
      insights.push({
        id: 'timeline-enhanced',
        type: 'info' as const,
        category: 'timeline' as const,
        title: 'Timeline Events Enhanced',
        description: `${timelineTasks.length} timeline events have been analyzed and enhanced with AI-generated content.`,
        timestamp: new Date().toISOString(),
        actionable: false,
      });
    }

    return insights;
  }

  async recordFeedback(
    taskId: string,
    feedback: string,
    rating?: number
  ): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    // Find the interaction in memory and add feedback
    const interaction = this.memory.interactions.find(
      (i) => i.type === task.type && i.input === task.data
    );

    if (interaction) {
      interaction.feedback = feedback;
    }

    // Learn from feedback
    if (rating && rating >= 4) {
      this.memory.learnings.bestPractices.push(
        `${task.type}: ${feedback} (Rating: ${rating}/5)`
      );
    }

    console.log(`Feedback recorded for task ${taskId}: ${feedback}`);
    await this.saveMemoryToStrapi();
  }
}

export default AIOrchestrator;
