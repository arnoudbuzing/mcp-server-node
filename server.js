import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { promises as fs } from "fs"

const server = new McpServer({
  name: "wolfram-alpha",
  version: "1.0.0",
})

server.tool(
  "wolfram-alpha", 
  "Wolfram Alpha makes systematic knowledge computable", 
  { input: z.string() }, 
  async ({ input }) => {
    console.log("Wolfram Alpha input:", input);
    console.log("Wolfram Alpha API Key:", process.env.WOLFRAM_API_KEY);
    // const response = await fetch(`https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(input)}&appid=${process.env.WOLFRAM_API_KEY}`);
    const response = await fetch(`https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(input)}&appid=JQVGQH-24RGK5KJ2A`);
    const result = await response.text();
    return {
      content: [{ type: "text", text: result }]
    };
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
