import { readFile } from "node:fs/promises"
import path from "node:path"

import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  try {
    const graphPath = path.resolve(
      process.cwd(),
      "..",
      "..",
      "graphify-out",
      "graph.json"
    )
    const raw = await readFile(graphPath, "utf8")
    const graph = JSON.parse(raw)

    if (!q)
      return NextResponse.json({
        nodes: graph.nodes?.length ?? 0,
        edges: graph.edges?.length ?? 0,
        report_available: true,
      })

    const matches = graph.nodes
      ?.filter((n: unknown) =>
        JSON.stringify(n).toLowerCase().includes(q.toLowerCase())
      )
      .slice(0, 20)

    return NextResponse.json({ query: q, results: matches ?? [] })
  } catch {
    return NextResponse.json({
      error: "Graph not built yet. Run /graphify . in Claude Code.",
      report_available: false,
    })
  }
}
