import mongoose from 'mongoose';

export const connect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI!!, {});
    if (connection.readyState === 1) {
      console.log('MongoDB connected');
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return Promise.reject(false);
  }
};
