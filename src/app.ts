import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server up and running');
});

app.get('/*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'error occured.' });
});

export default app;
