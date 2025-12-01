import mongoose from "mongoose";


export const connectDB = async() => {
    const MONGODB_URI = 'mongodb+srv://neelesh2003:neelesh123@cluster0.eoqktxa.mongodb.net/Express?appName=Cluster0';

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error; // Re-throw so the caller can handle it
    }
}

