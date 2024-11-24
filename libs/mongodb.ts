import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

export const dbConnect = async () => {
  try {
    if (process.env.MONGODB_URI === undefined) {
      throw new Error('MONGODB_URI is undefined');
    }
    if (connection.isConnected) {
      console.log('Using existing connection.');
      return;
    }
    console.log('Using new connection.');
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
