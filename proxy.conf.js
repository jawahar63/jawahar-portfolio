const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

// Function to check if a port is in use
function checkPort(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is in use
      } else {
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is free
    });
    server.listen(port);
  });
}

// Automatically start the local secure API server if not already running
(async () => {
  const isRunning = await checkPort(3000);
  if (!isRunning) {
    console.log('\x1b[36m%s\x1b[0m', '[Proxy] Local API server is not running. Starting it on port 3000...');
    const apiProcess = spawn('node', [path.join(__dirname, 'mynode.js'), '--api-only'], {
      detached: true,
      stdio: 'ignore',
      shell: true
    });
    apiProcess.unref();
  }
})();

module.exports = {
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
};
