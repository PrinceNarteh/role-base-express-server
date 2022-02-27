import mongoose from 'mongoose';
import AppError from '../utils/appError';

export async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog');
    console.log(`🌍 Database connected successfully.`);
  } catch (err: any) {
    throw new AppError('Could not connect to database', 500);
  }
}

mongoose.connection.on('connection', () => {
  console.log(`Database connected successfully!`);
});
