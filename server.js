import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

import { server } from "./server-logic.js";

const app = express();

app.get("/", (_req, res) => {
  res.send("mcp start");
});

let transport;
app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  await transport.handlePostMessage(req, res);
});

const port = 8000;
app.listen(port, () => {
  console.log(`MCP SSE Server is running on http://localhost:${port}/sse`);
});
