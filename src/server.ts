import { createServer } from 'http';
const PORT = process.env.PORT || 4000;

import apiServer from './app';

const httpServer = createServer(apiServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
