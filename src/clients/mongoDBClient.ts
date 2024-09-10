import mongoose from "mongoose";

const uri = process.env.CONNECTION_MONGO;

export const connectDB = async () => {
    try {
        await mongoose.connect(uri as string, {
        });
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
