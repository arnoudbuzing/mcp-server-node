1. Clone the repository:

```
git clone git@github.com:arnoudbuzing/wolfram-mcp-server.git
```

2. Change to the project directory:

```
cd wolfram-mcp-server
```

3. Install the dependencies:

```
npm install
```

4. Get a Wolfram Alpha API key from https://developer.wolframalpha.com/access

4. Configure your MSP client (e.g. VS Code or Claude) by providing the MSP server configuration. See `config.json` for an example configuration that works with this server. You will need to set the path to the `server.js` file and also set the Wolfram Alpha API key.