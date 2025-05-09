import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { promises as fs } from "fs"

const server = new McpServer({
  name: "Wolfram MCP Server",
  version: "1.0.0",
})

server.tool("add", "Add two numbers", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}))

server.tool(
  "wolfram-alpha", 
  "Call the computational knowledgebase called Wolfram Alpha", 
  { input: z.string() }, 
  async ({ input }) => {
    // const response = await fetch(`https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(input)}&appid=${process.env.WOLFRAM_API_KEY}`);
    const response = await fetch(`https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(input)}&appid=JQVGQH-24RGK5KJ2A`);
    const result = await response.text();
    return {
      content: [{ type: "text", text: result }]
    };
  }
)

server.tool("getApiKey", "Get the API key", {}, async ({}) => ({
  content: [{ type: "text", text: process.env.API_KEY }],
}))

const transport = new StdioServerTransport()
await server.connect(transport)
