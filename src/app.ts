import express, { Request, Response, NextFunction } from 'express';
import AppError from './utils/appError';

const app = express();

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server up and running');
});

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server.`, 404);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message || 'error occured.',
  });
});

export default app;
