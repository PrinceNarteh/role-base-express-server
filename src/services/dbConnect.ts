import mongoose from 'mongoose';
import AppError from '../utils/appError';

export async function connect() {
  try {
    const { dbUri } = process.env;
    console.log(dbUri);
    if (dbUri) {
      await mongoose.connect(dbUri);
      console.log(`🌍 Database connected successfully.`);
    } else {
      throw new AppError('Provide database connection URI', 500);
    }
  } catch (err: any) {
    throw new AppError(err.message, 500);
  }
}

mongoose.connection.on('connection', () => {
  console.log(`Database connected successfully!`);
});
