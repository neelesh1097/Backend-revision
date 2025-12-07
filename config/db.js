import mongoose from "mongoose";


export const connectDB = async() => {
    const MONGODB_URI = 'ENTER KRY HERE';

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error; // Re-throw so the caller can handle it
    }
}

