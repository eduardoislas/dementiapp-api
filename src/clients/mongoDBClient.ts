import mongoose from "mongoose";
import {getLogger} from "./logger";

const uri = process.env.CONNECTION_MONGO;

export const connectDB = async () => {
    const logger = getLogger();
    try {
        await mongoose.connect(uri as string, {
        });
        logger.info('Connected to MongoDB with Mongoose');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
