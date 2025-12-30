# Hedera Agent Kit Plugin Template

This repository is a learning-friendly scaffold for building Hedera Agent Kit plugins. It ships with a working `hello-world` tool and a teacher (`AGENTS.md`) that can guide you through creating a `simple-transfer-hbar` tool.

---

## Quickstart

### 1. Clone the repo

```bash
git clone https://github.com/hedera-dev/tutorial-create-hedera-agent-kit-plugin.git
cd tutorial-create-hedera-agent-kit-plugin
npm install
npm ci
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Get your Account ID and Private Key from the [Hedera Portal](https://portal.hedera.com).

```bash
HEDERA_ACCOUNT_ID=0.0.xxxx
HEDERA_PRIVATE_KEY=0x...
```

### 3. Start a chat with your AI teacher

Use your coding agent’s “chat with this project” command and say something like `gm teacher`.

For example:

**Codex CLI**

```bash
codex "gm teacher"
```

**Claude Code**

```bash
claude "gm teacher"
```

If you’re using another agent (Cursor, VS Code extension, etc.), open its chat for this repo and send the same message.

---

## Repository Layout

| Path           | Purpose                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------- |
| `src/index.ts` | Entry point exporting the plugin metadata and registered tools.                          |
| `src/tools/`   | Individual tool factories (e.g., `hello-world`, `simple-transfer-hbar`).                 |
| `src/schemas/` | Zod schema factories for tool inputs.                                                    |
| `examples/`    | Sample scripts (see `examples/cli-chat.ts`, used by `npm test`).                         |
| `AGENTS.md`    | Tutorial-style teacher that coaches a learner through recreating `simple-transfer-hbar`. |

## Extending the Template

- Add new schemas under `src/schemas/` to keep validation centralized.
- Introduce tools under `src/tools/`, exporting factories that consume `Context`.
- Update `src/index.ts` so the plugin returns every tool you want to expose.
- Mirror the AGENTS format to create additional guided lessons (e.g., balance checks, topic messages).

When contributing, run `npm run typecheck` and `npm run build` before sharing changes, and consider adding new self-check steps to `AGENTS.md` so future agents learn from the patterns you establish.

Happy building! 🪄
