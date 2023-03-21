import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  // Connect to MongoDB
  try {
    const connection = mongoose.connect(process.env.DATABASE_URL as string);
    console.log('MongoDB Connected');
    return connection;
  } catch (err) {
    console.error('Connection to MongoDB failed.', (err as Error).message);
  }
};

export default mongoConnect;
