import { run, type RunResult } from "@paretools/shared";

export async function npm(args: string[], cwd?: string): Promise<RunResult> {
  return run("npm", args, { cwd });
}
