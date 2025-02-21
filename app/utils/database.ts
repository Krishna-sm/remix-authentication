import mongoose from "mongoose";

export const ConnectDB = async()=>{
    try {
            await    mongoose.connect(process.env.MONGO_URI!)
                console.log(`the database is connect with ${mongoose.connection.host}`);
                
    } catch (error:any) {
        process.exit(1)
        console.log(error.message);
        
    }
}