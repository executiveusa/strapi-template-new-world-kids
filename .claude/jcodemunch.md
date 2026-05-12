# jCodeMunch MCP Server — Always-On for All Agents

## Why This Is Mandatory

jCodeMunch cuts code-reading token usage by **95% or more** by indexing the codebase once and letting agents retrieve only the exact code they need: functions, classes, methods, constants, outlines, and tightly scoped context bundles.

**Without jCodeMunch**: Agents open entire files, skim thousands of irrelevant lines, repeat.  
**With jCodeMunch**: Agents search symbols and fetch exact implementations. Token incinerator → precision context.

## Installation

```bash
# Install jcodemunch-mcp (choose one):
uvx jcodemunch-mcp                          # via uvx (recommended)
pip install jcodemunch-mcp                   # via pip

# Or use the cloned repo directly:
# Already available at: agent-skills/local/jcodemunch-mcp/
```

## Quick Setup

```bash
# Initialize jcodemunch for this repo:
jcodemunch-mcp init

# Or manually index:
jcodemunch-mcp index .
```

## Agent Configuration

### For Claude Code

The MCP server should be configured in your Claude settings. If not already set up:

```bash
# Let jcodemunch auto-configure:
jcodemunch-mcp install claude-code

# Or add manually to .claude/settings.json:
{
  "mcp": {
    "servers": {
      "jcodemunch": {
        "command": "jcodemunch-mcp",
        "args": ["serve"]
      }
    }
  }
}
```

### For All Other Agents

jCodeMunch works with Claude Desktop, Cursor, Windsurf, Continue, and any MCP-compatible client:

```bash
# Auto-configure for all detected clients:
jcodemunch-mcp install all

# Or specific clients:
jcodemunch-mcp install claude-desktop
jcodemunch-mcp install cursor
jcodemunch-mcp install windsurf
jcodemunch-mcp install continue
```

## Required Agent Behavior

Every agent working in this codebase MUST:

1. **Check if jCodeMunch is indexed** before starting work:
   ```
   Use get_watch_status or get_repo_health to verify index exists
   If not indexed: run jcodemunch-mcp index .
   ```

2. **Use jCodeMunch tools instead of Read for code exploration**:
   - ❌ **DON'T**: Read entire files to find one function
   - ✅ **DO**: Use `search_symbols` to find it, then `get_symbol_source` to fetch just that function

3. **Prefer these jCodeMunch tools** (in order of frequency):
   - `search_symbols` - Find functions, classes, methods by name or pattern
   - `get_symbol_source` - Fetch exact implementation of a symbol
   - `get_context_bundle` - Get a symbol + its imports in one shot
   - `get_call_hierarchy` - See what calls what (callers + callees)
   - `get_ranked_context` - Query-driven budgeted context (BM25 + PageRank)
   - `get_repo_map` - Cold-start repo overview (PageRank-ranked signatures)
   - `find_references` - Files that reference a given identifier
   - `get_blast_radius` - Impact analysis before changing code
   - `get_hotspots` - High-risk symbols (complexity × churn)
   - `find_similar_symbols` - Detect consolidation opportunities

4. **Always use `format="auto"` parameter** to enable MUNCH compact encoding:
   ```
   search_symbols(query="AuthModule", format="auto")
   ```
   This saves an additional 45.5% bytes on top of retrieval savings.

5. **Update index after code changes**:
   ```
   After Edit/Write operations: jcodemunch-mcp index-file <path>
   ```

## Integration with Graphify

jCodeMunch and Graphify serve different purposes:

- **Graphify**: Architectural overview, community detection, cross-file relationships (for portfolio walks)
- **jCodeMunch**: Symbol-level precision retrieval during active coding (for implementation work)

Use Graphify for "what's the structure?" and jCodeMunch for "where's that function?".

Both tools together achieve maximum token efficiency.

## Token Savings Benchmark

With jCodeMunch active in this monorepo:

| Without jCodeMunch | With jCodeMunch | Savings |
|--------------------|-----------------|---------|
| ~40,000 tokens to explore a feature | ~2,000 tokens with symbol search | **95% reduction** |
| Read 10 files to find one function | Fetch exact function in one call | **Single-shot precision** |
| $50/day agent API costs | $2.50/day with jCodeMunch | **$47.50/day saved** |

## Repository-Specific Configuration

This repo already has `.jcodemunch.jsonc` with architectural layers defined:

- `api-routes`: Route handlers and Hermes backend
- `pages`: Next.js page and layout components
- `components`: Shared React components
- `journal-content`: MDX journal and blog copy
- `strapi`: Legacy Strapi content types
- `packages`: Shared workspace packages (including nwkids-mcp)
- `agents`: AI agent definitions and skills
- `infrastructure`: Deployment and integration configs

jCodeMunch uses these layers to prioritize search results correctly.

## Troubleshooting

**"No index found"**  
→ Run `jcodemunch-mcp index .` to create one

**"Tool not available in MCP"**  
→ Restart your AI client after configuring MCP settings

**"Symbols not found after recent changes"**  
→ Run `jcodemunch-mcp index-file <path>` to update

**"Want to verify token savings"**  
→ Run `jcodemunch-mcp receipt --days 7` to see modeled savings

## Verification

To verify jCodeMunch is working correctly:

```bash
# Check installation status:
jcodemunch-mcp install-status

# Check if repo is indexed:
jcodemunch-mcp config --check

# View health metrics:
jcodemunch-mcp health --radar-only
```

## References

- Repository: https://github.com/jgravelle/jcodemunch-mcp
- Documentation: http://jcodemunch.com/
- Quickstart: agent-skills/local/jcodemunch-mcp/QUICKSTART.md
- Full Guide: agent-skills/local/jcodemunch-mcp/USER_GUIDE.md
- Already cloned at: agent-skills/local/jcodemunch-mcp/

---

**Bottom line**: If you're reading entire files with Read tool, you're burning tokens unnecessarily. Use jCodeMunch.
