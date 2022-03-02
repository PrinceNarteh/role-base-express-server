import { CorsOptions } from 'cors';
import AppError from '../utils/appError';

const whitelist = ['http://localhost:3000'];
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || (origin && whitelist.indexOf(origin) !== -1)) {
      callback(null, true);
    } else {
      callback(new AppError('Not allowed by CORS', 400));
    }
  },
  optionsSuccessStatus: 200,
};
