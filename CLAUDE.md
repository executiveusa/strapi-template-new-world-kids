# Claude Code Session Rules

## Token Saver Protocol (MANDATORY)

All coding sessions must operate under the Token Saver Protocol to minimize API costs and context bloat.

### Pre-Session Checklist

- [ ] jcodemunch available for symbol search (95% compression)
- [ ] RTK installed for CLI output compression (60-90% compression)
- [ ] Cost guards active: $10/task, $50/daily limit
- [ ] Compression floor: 65% minimum
- [ ] NIM proxy connectivity verified

### Model Routing (Cascade)

1. **GPT-5.4 Mini** (default) — classification, pattern matching, known solutions
2. **GPT-5.4 Batch** — bulk operations, can wait 12-24 hours (50% discount)
3. **Frontier models** — only for novel architecture, no codebase precedent

Default to smallest/cheapest model unless frontier reasoning is proven necessary.

### Context Assembly Rules

- Use `jcodemunch search_symbols` for function lookups (not grep)
- Use `jcodemunch get_repo_map` for architecture overview
- Use RTK for all CLI output compression (bash commands automatically routed)
- Never concatenate long contexts; chunk and index instead
- Max output per response: 1200 words prose, 4096 lines code, JSON for data

### Output Constraints

- Hard stop at $10 per task (halt and require override if exceeded)
- Hard stop at $50 per day (halt permanently if exceeded until reset)
- Every response must include: model used, token count, cost, compression %
- Measure and log all sessions to `ops/reports/[session-id].json`

## NVIDIA NIM Integration

### Proxy Configuration

```
Base URL:   http://31.220.58.212:8082
API Key:    dummy (not validated)
Model:      moonshotai/kimi-k2-thinking
Protocol:   OpenAI-compatible
Rate Limit: 40 req/min
```

### Client Usage

```typescript
import { nimChat } from "@/lib/nvidia-nim"

const reply = await nimChat([{ role: "user", content: "Your message" }], {
  systemPrompt: "Optional system instruction",
  maxTokens: 4096,
  temperature: 0.7,
})
```

### Environment Variables

Required in `.env.local`:

```
NVIDIA_NIM_BASE_URL=http://31.220.58.212:8082
NVIDIA_NIM_API_KEY=dummy
NVIDIA_NIM_MODEL=moonshotai/kimi-k2-thinking
```

## Development Guidelines

1. **Commit frequently** — Small, atomic commits with clear messages
2. **Push to branch** — Always: `git push -u origin claude/nw-kids-site-redesign-OjB5s`
3. **Create PRs** — Draft PR after push if none exists
4. **Test before reporting** — Verify features work in browser/app before completion
5. **Avoid bloat** — No over-engineering, no premature abstractions, no dead code

## Cost Tracking

All sessions log to `ops/reports/`:

- Token counts (input/output)
- Model used
- RTK compression %
- jcodemunch hits
- Total cost per session
- Daily aggregate

Review cost reports daily to stay under budget.

---

**Token Saver Protocol Active** — All coding follows these rules without exception.
