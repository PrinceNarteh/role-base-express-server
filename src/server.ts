import { createServer } from 'http';
const PORT = process.env.PORT || 4000;

import apiServer from './app';
import { connect } from './services/dbConnect';

const httpServer = createServer(apiServer);

async function start() {
  await connect();

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

start();
