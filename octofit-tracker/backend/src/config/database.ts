import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Unable to connect to octofit_db:', error);
  }
};

db.on('error', (error) => console.error('Database error:', error));

export default db;
