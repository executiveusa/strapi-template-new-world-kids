# Absurd

Source docs: https://earendil-works.github.io/absurd/

Use Absurd when the agent needs durable state that stays simple.

## What matters

- Absurd is Postgres-native durable execution.
- Workflow state lives in Postgres.
- The core primitives are tasks, steps, retries, sleep, and events.
- It is intentionally small: one SQL schema, no extra queue service, no extra coordinator.

## Simple agent rule

- Put checkpoints in the database.
- Retry from the last checkpoint, not from scratch.
- Use events to wake suspended work.
- Keep the worker pull-based.

## Practical commands

```bash
absurdctl init
absurdctl create-queue default
absurdctl list-queues
absurdctl list-tasks --queue=default --limit=20
absurdctl dump-task --task-id=<task-id>
absurdctl emit-event --name <event-name> --data '{}'
```

## Production rule

- Apply the Absurd schema through the normal database migration flow for production.
- Keep the database simple enough that an operator can inspect task state without extra tooling.

