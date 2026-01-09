import Anthropic from "@anthropic-ai/sdk";

/**
 * Rube MCP Server for NotebookLLM Integration
 * Connects Stellar Agents to Google's NotebookLLM for infinite context expansion
 */

const client = new Anthropic();

interface NotebookSource {
  id: string;
  title: string;
  content: string;
  type: "text" | "url" | "document";
  createdAt: string;
}

interface NotebookLLMContext {
  notebookId: string;
  sources: NotebookSource[];
  audioOverview?: string;
  insights: string[];
  lastUpdated: string;
}

// In-memory store (use Redis in production)
const notebookStore = new Map<string, NotebookLLMContext>();
const agentContextMap = new Map<string, string>(); // agent ID -> notebook ID

/**
 * Create a new NotebookLLM context
 */
export async function createNotebook(
  title: string,
  sources: NotebookSource[]
): Promise<NotebookLLMContext> {
  const notebookId = `notebook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const notebook: NotebookLLMContext = {
    notebookId,
    sources,
    insights: [],
    lastUpdated: new Date().toISOString(),
  };

  notebookStore.set(notebookId, notebook);

  console.log(`✅ Created NotebookLLM: ${title} (${notebookId})`);
  return notebook;
}

/**
 * Add audio overview to notebook using Claude
 */
export async function addAudioOverview(notebookId: string): Promise<string> {
  const notebook = notebookStore.get(notebookId);
  if (!notebook) throw new Error(`Notebook ${notebookId} not found`);

  const sourceSummary = notebook.sources
    .map((s) => `- ${s.title}: ${s.content.substring(0, 200)}...`)
    .join("\n");

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate a concise 2-minute audio script overview of these notebook sources:\n\n${sourceSummary}\n\nSpeak in a conversational, engaging tone suitable for audio format.`,
      },
    ],
  });

  const overview =
    message.content[0].type === "text" ? message.content[0].text : "";
  notebook.audioOverview = overview;
  notebookStore.set(notebookId, notebook);

  console.log(`🎙️ Generated audio overview for ${notebookId}`);
  return overview;
}

/**
 * Query a notebook using Claude
 */
export async function queryNotebook(
  notebookId: string,
  query: string
): Promise<string> {
  const notebook = notebookStore.get(notebookId);
  if (!notebook) throw new Error(`Notebook ${notebookId} not found`);

  const context = notebook.sources
    .map((s) => `[${s.title}]\n${s.content}`)
    .join("\n\n---\n\n");

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Based on these sources:\n\n${context}\n\nAnswer this query: ${query}`,
      },
    ],
  });

  const answer = message.content[0].type === "text" ? message.content[0].text : "";

  // Store as new insight
  notebook.insights.push(`Q: ${query}\nA: ${answer}`);
  notebook.lastUpdated = new Date().toISOString();
  notebookStore.set(notebookId, notebook);

  return answer;
}

/**
 * Sync agent context with notebook (bidirectional)
 */
export async function syncAgentContext(
  agentId: string,
  agentLogs: string[],
  agentDecisions: string[]
): Promise<{
  notebookId: string;
  agentContext: string;
  nextAction: string;
}> {
  // Create or get notebook for this agent
  let notebookId = agentContextMap.get(agentId);

  if (!notebookId) {
    // Create new notebook with agent logs
    const sources: NotebookSource[] = [
      {
        id: "agent-logs",
        title: `${agentId} - Task Logs`,
        content: agentLogs.join("\n"),
        type: "text",
        createdAt: new Date().toISOString(),
      },
      {
        id: "agent-decisions",
        title: `${agentId} - Decision History`,
        content: agentDecisions.join("\n"),
        type: "text",
        createdAt: new Date().toISOString(),
      },
    ];

    const notebook = await createNotebook(
      `${agentId} Context Notebook`,
      sources
    );
    notebookId = notebook.notebookId;
    agentContextMap.set(agentId, notebookId);
  } else {
    // Update existing notebook
    const notebook = notebookStore.get(notebookId)!;
    notebook.sources[0].content = agentLogs.join("\n");
    notebook.sources[1].content = agentDecisions.join("\n");
    notebook.lastUpdated = new Date().toISOString();
    notebookStore.set(notebookId, notebook);
  }

  // Query notebook for insights
  const agentContext = await queryNotebook(
    notebookId,
    "Summarize this agent's progress and identify next priorities"
  );

  // Generate next action recommendation
  const nextAction = await queryNotebook(
    notebookId,
    "What should be the agent's next action based on all logs and decisions?"
  );

  console.log(`🔄 Synced ${agentId} with notebook ${notebookId}`);

  return {
    notebookId,
    agentContext,
    nextAction,
  };
}

/**
 * Get notebook details
 */
export function getNotebook(notebookId: string): NotebookLLMContext | null {
  return notebookStore.get(notebookId) || null;
}

/**
 * List all notebooks
 */
export function listNotebooks(): NotebookLLMContext[] {
  return Array.from(notebookStore.values());
}

/**
 * Export notebook as formatted document
 */
export function exportNotebook(
  notebookId: string
): {
  title: string;
  content: string;
  format: "markdown" | "pdf";
} {
  const notebook = notebookStore.get(notebookId);
  if (!notebook) throw new Error(`Notebook ${notebookId} not found`);

  const markdown = `# ${notebook.sources[0]?.title || "Notebook"}

## Overview
${notebook.audioOverview || "No audio overview generated yet"}

## Sources
${notebook.sources.map((s) => `### ${s.title}\n${s.content}`).join("\n\n")}

## Insights
${notebook.insights.map((i) => `- ${i}`).join("\n")}

## Metadata
- Created: ${notebook.sources[0]?.createdAt || "Unknown"}
- Last Updated: ${notebook.lastUpdated}
- Total Insights: ${notebook.insights.length}
`;

  return {
    title: notebook.sources[0]?.title || "Notebook",
    content: markdown,
    format: "markdown",
  };
}
