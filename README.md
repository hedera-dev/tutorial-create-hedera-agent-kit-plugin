# Hedera Agent Kit Plugin Template

This repository is a learning-friendly scaffold for building Hedera Agent Kit plugins. It ships with a working `hello-world` tool and a teacher (`AGENTS.md`) that can guide you through creating a `simple-transfer-hbar` tool.

Use it to:

- Prototype new Hedera tools with consistent Zod schemas and Agent Kit context handling.
- Teach Copilot/Cursor/Claude-style agents how to build or verify plugins via the included teacher playbooks.
- Experiment locally with CLI chat examples powered by the plugin.

> **Node**: Target Node.js 20+. Install dependencies with `npm ci` whenever possible.

---

## Repository Layout

| Path           | Purpose                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------- |
| `src/index.ts` | Entry point exporting the plugin metadata and registered tools.                          |
| `src/tools/`   | Individual tool factories (e.g., `hello-world`, `simple-transfer-hbar`).                 |
| `src/schemas/` | Zod schema factories for tool inputs.                                                    |
| `examples/`    | Sample scripts (see `examples/cli-chat.ts`, used by `npm test`).                         |
| `AGENTS.md`    | Tutorial-style teacher that coaches a learner through recreating `simple-transfer-hbar`. |

---

## Quickstart

```bash
git clone https://github.com/hedera-dev/tutorial-create-hedera-agent-kit-plugin.git
cd tutorial-create-hedera-agent-kit-plugin
npm ci
```

Core scripts:

| Command             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `npm run typecheck` | TypeScript type checking (`tsc --noEmit`).              |
| `npm run build`     | Bundles the plugin via `tsup`.                          |
| `npm test`          | Runs the CLI chat example (`tsx examples/cli-chat.ts`). |

Set Hedera credentials before running tools that hit the network:

```bash
export HEDERA_ACCOUNT_ID=0.0.xxxx
export HEDERA_PRIVATE_KEY=0x...
```

Keep real secrets out of the repo—use `.env`/`.env.local` ignored by Git.

---

## Using the Teacher Guide

### AGENTS.md — Simple Transfer Workshop

`AGENTS.md` walks a learner (human or AI) through recreating `src/tools/simple-transfer-hbar.ts` from scratch:

1. Orient within the repo and inspect existing tools.
2. Scaffold the parameter schema under `src/schemas/`.
3. Implement the Hedera transfer tool with proper error handling and Agent Kit transaction submission.
4. Wire the tool into `src/index.ts`.
5. Run local checks (`npm run typecheck`, `npm run lint` if added, `npm run build`, `npm test`).
6. Optionally exercise the tool manually with environment variables set.

It emphasizes a “teach, don’t do” style: state the goal, wait for the learner, self-check using file contents, then respond with `✅` or `🔍` guidance. Use this file when you want an AI assistant to coach someone through the build rather than editing files itself.

---

## Extending the Template

- Add new schemas under `src/schemas/` to keep validation centralized.
- Introduce tools under `src/tools/`, exporting factories that consume `Context`.
- Update `src/index.ts` so the plugin returns every tool you want to expose.
- Mirror the AGENTS format to create additional guided lessons (e.g., balance checks, topic messages).

When contributing, run `npm run typecheck` and `npm run build` before sharing changes, and consider adding new self-check steps to `AGENTS.md` so future agents learn from the patterns you establish.

Happy building! 🪄
