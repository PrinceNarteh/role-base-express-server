import { CorsOptions } from 'cors';
import AppError from '../utils/appError';

export const allowedOrigins = ['http://localhost:3000'];
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || (origin && allowedOrigins.indexOf(origin) !== -1)) {
      callback(null, true);
    } else {
      callback(new AppError('Not allowed by CORS', 400));
    }
  },
  optionsSuccessStatus: 200,
};
