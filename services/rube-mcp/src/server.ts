import express, { Request, Response } from "express";
import {
  createNotebook,
  addAudioOverview,
  queryNotebook,
  syncAgentContext,
  getNotebook,
  listNotebooks,
  exportNotebook,
} from "./notebook-service";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3015;

/**
 * Health check endpoint
 */
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "rube-mcp",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Create notebook
 * POST /notebooks
 */
app.post("/notebooks", async (req: Request, res: Response) => {
  try {
    const { title, sources } = req.body;

    if (!title || !sources) {
      res.status(400).json({ error: "Missing title or sources" });
      return;
    }

    const notebook = await createNotebook(title, sources);
    res.json(notebook);
  } catch (error) {
    console.error("Error creating notebook:", error);
    res.status(500).json({ error: "Failed to create notebook" });
  }
});

/**
 * Add audio overview
 * POST /notebooks/:id/audio
 */
app.post("/notebooks/:id/audio", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const overview = await addAudioOverview(id);
    res.json({ notebookId: id, overview });
  } catch (error) {
    console.error("Error adding audio overview:", error);
    res.status(500).json({ error: "Failed to add audio overview" });
  }
});

/**
 * Query notebook
 * POST /notebooks/:id/query
 */
app.post("/notebooks/:id/query", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { query } = req.body;

    if (!query) {
      res.status(400).json({ error: "Missing query" });
      return;
    }

    const answer = await queryNotebook(id, query);
    res.json({ notebookId: id, query, answer });
  } catch (error) {
    console.error("Error querying notebook:", error);
    res.status(500).json({ error: "Failed to query notebook" });
  }
});

/**
 * Sync agent context
 * POST /agents/:agentId/sync
 */
app.post("/agents/:agentId/sync", async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const { logs, decisions } = req.body;

    if (!logs || !decisions) {
      res.status(400).json({ error: "Missing logs or decisions" });
      return;
    }

    const result = await syncAgentContext(agentId, logs, decisions);
    res.json(result);
  } catch (error) {
    console.error("Error syncing agent context:", error);
    res.status(500).json({ error: "Failed to sync agent context" });
  }
});

/**
 * Get notebook
 * GET /notebooks/:id
 */
app.get("/notebooks/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notebook = getNotebook(id);

    if (!notebook) {
      res.status(404).json({ error: "Notebook not found" });
      return;
    }

    res.json(notebook);
  } catch (error) {
    console.error("Error fetching notebook:", error);
    res.status(500).json({ error: "Failed to fetch notebook" });
  }
});

/**
 * List notebooks
 * GET /notebooks
 */
app.get("/notebooks", (req: Request, res: Response) => {
  try {
    const notebooks = listNotebooks();
    res.json({ notebooks, count: notebooks.length });
  } catch (error) {
    console.error("Error listing notebooks:", error);
    res.status(500).json({ error: "Failed to list notebooks" });
  }
});

/**
 * Export notebook
 * GET /notebooks/:id/export
 */
app.get("/notebooks/:id/export", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { format } = req.query;

    const exported = exportNotebook(id);

    if (format === "pdf") {
      // TODO: Implement PDF export
      res.json({
        ...exported,
        message: "PDF export coming soon, returning markdown for now",
      });
    } else {
      res.set("Content-Type", "text/markdown");
      res.set(
        "Content-Disposition",
        `attachment; filename="${exported.title}.md"`
      );
      res.send(exported.content);
    }
  } catch (error) {
    console.error("Error exporting notebook:", error);
    res.status(500).json({ error: "Failed to export notebook" });
  }
});

/**
 * Health metrics
 * GET /metrics
 */
app.get("/metrics", (req: Request, res: Response) => {
  const notebooks = listNotebooks();
  const totalSources = notebooks.reduce((sum, n) => sum + n.sources.length, 0);
  const totalInsights = notebooks.reduce((sum, n) => sum + n.insights.length, 0);

  res.json({
    notebookCount: notebooks.length,
    totalSources,
    totalInsights,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Rube MCP Server running on port ${PORT}`);
  console.log(`📚 NotebookLLM Integration Active`);
  console.log(`🔗 http://localhost:${PORT}/health`);
});
