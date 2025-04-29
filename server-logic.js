import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import systemPrompts from "./systemPrompts.js";

export const server = new McpServer({
  name: "Fulfillment MCP Server",
  version: "1.0.0",
});

const tools = [
  "generateCodeReact",
  "generateCodeNext",
  "generateCodeAngular",
  "generateCodeVanilla",
  "generateCodeVue",
  "generateCodeNode",
  "refinedPrompt",
  // "generateSugesstions",
  // "generateQuestions",
  // "summaryImport",
];

tools.forEach((tool) => {
  server.tool(tool, systemPrompts[tool], async () => {
    console.log("Tool called:", tool);
    return { content: [{ type: "text", text: tool }] };
  });
});
