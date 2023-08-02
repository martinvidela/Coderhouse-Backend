import mongoose from "mongoose";
import { config } from "./config";

export const connectDB = async() =>{

    try {
        await mongoose.connect(config.mongo.url);
        
    } catch (error) {
        console.log(error)
    }

}