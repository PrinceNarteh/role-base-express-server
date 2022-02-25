const http = require('http');
const PORT = process.env.PORT || 4000;

const apiServer = require('./src/app');

const httpServer = http.createServer(apiServer);

httpServer.createServer(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
