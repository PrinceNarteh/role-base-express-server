import express, { Request, Response } from 'express';
const app = express();

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server up and running');
});

app.get('/*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use((err, req, res) => {});

export default app;
