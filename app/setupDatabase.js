import mongoose from 'mongoose';
import config from './configuration';

export default function() {
  return mongoose.connect(config.databaseUrl);
}
