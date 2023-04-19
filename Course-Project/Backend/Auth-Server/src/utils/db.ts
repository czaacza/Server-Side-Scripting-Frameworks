import { config } from '../config/config';
import mongoose from 'mongoose';
import Logging from './Logging';

export default async function connectToMongoDB() {
  const connection = await mongoose.connect(config.mongo.url as string, {
    retryWrites: true,
    w: 'majority',
  });
  Logging.info('Connected to mongoDB');
}
