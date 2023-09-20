import mongoose from "mongoose";
const connectDB = async(connectionUrl:string): Promise<void> => {
    try {
       await mongoose.connect(connectionUrl);
       console.log('mongoDB connected!');
        
    } catch (error) {
        throw new Error('failed to connect to mongodb')
    }
};

export default connectDB