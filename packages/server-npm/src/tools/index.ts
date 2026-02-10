import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerInstallTool } from "./install.js";
import { registerAuditTool } from "./audit.js";
import { registerOutdatedTool } from "./outdated.js";
import { registerListTool } from "./list.js";

export function registerAllTools(server: McpServer) {
  registerInstallTool(server);
  registerAuditTool(server);
  registerOutdatedTool(server);
  registerListTool(server);
}
