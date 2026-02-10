import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerRunTool } from "./run.js";
import { registerCoverageTool } from "./coverage.js";

export function registerAllTools(server: McpServer) {
  registerRunTool(server);
  registerCoverageTool(server);
}
