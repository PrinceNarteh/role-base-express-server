import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';

// imports
import { corsOptions } from './config/corsOptions';
import rootRouter from './routes/root.router';
import AppError from './utils/appError';

// instanciate express app
const app = express();

// middleware
app.use(morgan('dev'));

// Cross Site Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for handling urlencoded data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookie
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

// checks if API is working
app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server up and running');
});

// routes
app.use('/api', rootRouter);

// Not Found Handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server.`, 404);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message || 'error occured.',
  });
});

export default app;
