import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

export interface GeminiConfig {
  apiKey: string;
  model?: string;
}

export interface MultimodalInput {
  text?: string;
  images?: Array<{
    data: string; // base64 encoded
    mimeType: string;
  }>;
  videos?: Array<{
    data: string;
    mimeType: string;
  }>;
}

export interface GeminiResponse {
  text: string;
  reasoning?: string;
  confidence?: number;
}

export class GeminiIntegration {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private modelName: string;

  constructor(config: GeminiConfig) {
    if (!config.apiKey) {
      throw new Error('Gemini API key is required');
    }

    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.modelName = config.model || 'gemini-2.0-flash-exp';
    this.model = this.genAI.getGenerativeModel({ model: this.modelName });
  }

  async generateText(prompt: string): Promise<GeminiResponse> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        text,
        confidence: 0.95, // Gemini doesn't provide confidence, this is placeholder
      };
    } catch (error) {
      console.error('Gemini text generation error:', error);
      throw new Error(`Gemini generation failed: ${error}`);
    }
  }

  async analyzeMultimodal(input: MultimodalInput): Promise<GeminiResponse> {
    try {
      const parts = [];

      if (input.text) {
        parts.push({ text: input.text });
      }

      if (input.images && input.images.length > 0) {
        for (const image of input.images) {
          parts.push({
            inlineData: {
              data: image.data,
              mimeType: image.mimeType,
            },
          });
        }
      }

      if (input.videos && input.videos.length > 0) {
        for (const video of input.videos) {
          parts.push({
            inlineData: {
              data: video.data,
              mimeType: video.mimeType,
            },
          });
        }
      }

      const result = await this.model.generateContent(parts);
      const response = await result.response;
      const text = response.text();

      return {
        text,
        reasoning: 'Multimodal analysis completed',
        confidence: 0.92,
      };
    } catch (error) {
      console.error('Gemini multimodal analysis error:', error);
      throw new Error(`Gemini multimodal analysis failed: ${error}`);
    }
  }

  async analyzeGrantFit(
    grantDescription: string,
    nonprofitMission: string,
    pastSuccesses?: string[]
  ): Promise<{
    fitScore: number;
    reasoning: string;
    recommendations: string[];
  }> {
    const prompt = `
Analyze the fit between this grant opportunity and a nonprofit organization.

Grant Description:
${grantDescription}

Nonprofit Mission:
${nonprofitMission}

${pastSuccesses && pastSuccesses.length > 0 ? `Past Successes:\n${pastSuccesses.join('\n')}` : ''}

Provide a detailed analysis including:
1. Fit score (0-100)
2. Reasoning for the score
3. Specific recommendations for the application

Format your response as JSON with keys: fitScore, reasoning, recommendations (array)
`;

    try {
      const result = await this.generateText(prompt);
      const parsed = JSON.parse(result.text);

      return {
        fitScore: parsed.fitScore || 0,
        reasoning: parsed.reasoning || result.text,
        recommendations: parsed.recommendations || [],
      };
    } catch (error) {
      // Fallback if JSON parsing fails
      return {
        fitScore: 50,
        reasoning: result.text || 'Analysis could not be completed',
        recommendations: ['Review grant requirements manually'],
      };
    }
  }

  async draftGrantApplication(params: {
    grantName: string;
    requirements: string;
    nonprofitInfo: {
      name: string;
      mission: string;
      achievements: string[];
      targetPopulation: string;
    };
    fundingAmount: number;
  }): Promise<{
    letterOfIntent: string;
    fullApplication?: string;
    keyPoints: string[];
  }> {
    const prompt = `
Draft a compelling grant application for the following:

Grant: ${params.grantName}
Funding Amount: $${params.fundingAmount}

Grant Requirements:
${params.requirements}

Nonprofit Information:
Name: ${params.nonprofitInfo.name}
Mission: ${params.nonprofitInfo.mission}
Target Population: ${params.nonprofitInfo.targetPopulation}
Key Achievements:
${params.nonprofitInfo.achievements.join('\n')}

Please provide:
1. A letter of intent (LOI) - concise, compelling, 500-800 words
2. Key points that align the nonprofit's work with the grant's goals
3. Suggested narrative for a full application

Format as JSON with keys: letterOfIntent, keyPoints (array), fullApplication
`;

    try {
      const result = await this.generateText(prompt);
      const parsed = JSON.parse(result.text);

      return {
        letterOfIntent: parsed.letterOfIntent || '',
        fullApplication: parsed.fullApplication,
        keyPoints: parsed.keyPoints || [],
      };
    } catch (error) {
      console.error('Grant draft generation error:', error);
      throw new Error('Failed to generate grant application draft');
    }
  }

  async analyzeTimelineContent(params: {
    images?: string[]; // URLs or base64
    videos?: string[];
    description: string;
  }): Promise<{
    suggestedTitle: string;
    enhancedDescription: string;
    tags: string[];
    category: string;
  }> {
    const prompt = `
Analyze this timeline event content and suggest improvements:

Description: ${params.description}
Number of images: ${params.images?.length || 0}
Number of videos: ${params.videos?.length || 0}

Provide:
1. A compelling title
2. An enhanced description that tells the story better
3. Relevant tags
4. A category classification

Format as JSON with keys: suggestedTitle, enhancedDescription, tags (array), category
`;

    try {
      const result = await this.generateText(prompt);
      const parsed = JSON.parse(result.text);

      return {
        suggestedTitle: parsed.suggestedTitle || 'Timeline Event',
        enhancedDescription: parsed.enhancedDescription || params.description,
        tags: parsed.tags || [],
        category: parsed.category || 'General',
      };
    } catch (error) {
      return {
        suggestedTitle: 'Timeline Event',
        enhancedDescription: params.description,
        tags: [],
        category: 'General',
      };
    }
  }
}

export default GeminiIntegration;
