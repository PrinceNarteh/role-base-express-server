import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

import AppError from './utils/appError';

// instanciate express app
const app = express();

// middleware
app.use(morgan('dev'));

// Cross Site Resource Sharing
const whitelist = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new AppError('Not allowed by CORS', 400));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware for handling urlencoded data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server up and running');
});

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
