# Contributing to Pare

Thanks for your interest in contributing! Pare is designed to make contributing easy — each server is a self-contained package that wraps a single dev tool.

## Project Structure

Pare is a monorepo managed with **pnpm** and **TurboRepo**.

-   `packages/shared`: Common library containing dual output helpers, command runners, and utilities used by all servers.
-   `packages/server-*`: One package per CLI tool (e.g., `server-git`, `server-npm`, `server-cargo`).
-   `packages/tsconfig`, `packages/eslint-config`: Shared configuration files.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/Dave-London/Pare.git
cd pare

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

**Requirements**: Node.js >= 20, pnpm >= 10

## Adding a New Server

Each server wraps a CLI tool with structured, token-efficient output.

### 1. Scaffold the package

```bash
mkdir -p packages/server-<tool>/src/{tools,schemas,lib}
mkdir -p packages/server-<tool>/__tests__
```

### 2. Create `package.json`

Use an existing server (like `server-git`) as a reference for `package.json` dependencies and scripts.

### 3. Implement Tools and Schemas

Follow the patterns in existing servers:
-   Define Zod schemas in `src/schemas/index.ts`.
-   Implement tool logic in `src/tools/`.
-   Always use `dualOutput` or `compactDualOutput` from `@paretools/shared`.

## Adding a Tool to an Existing Server

To add a new command to an existing server, follow the pattern in [packages/server-git/src/tools/log.ts](file:///c:/Users/Rekha/Documents/GitHub/Pare/packages/server-git/src/tools/log.ts).

1.  Create a new file in `src/tools/<command>.ts`.
2.  Define a `register<Command>Tool` function.
3.  Register the tool in `src/index.ts`.

## Testing

We use **Vitest** for all testing. You can run tests for all packages or a specific one:

```bash
pnpm test                          # Run all tests
pnpm --filter @paretools/git test  # Run tests for a specific package
```

### Test Types

1.  **Unit Tests**: Test parsers and utility functions using static fixtures (captured CLI output).
2.  **Integration Tests**: Test the full MCP server lifecycle by spawning the server and using an MCP client.
3.  **Fidelity Tests**: Run real CLI commands and verify that the structured output accurately reflects the raw output.

## Code Style

-   **Prettier**: Formatting is handled automatically by **Husky** and **lint-staged** via a pre-commit hook. You don't need to format your code manually.
-   **ESLint**: Run `pnpm lint` to check for code quality issues.

## Key Principles

1.  **Always use `outputSchema` + `structuredContent`** — This is Pare's core differentiator.
2.  **Strip aggressively** — Only include data an agent would act on. No decorations or unnecessary text.
3.  **Use `execFile`, not `exec`** — Prevents shell injection.
4.  **Test with real output** — Use raw CLI output as test fixtures.

## Commit Messages

Use conventional commits:

-   `feat(git): add stash tool`
-   `fix(shared): handle binary file in ANSI strip`
-   `docs: update README with npm server example`
-   `chore: update dependencies`
