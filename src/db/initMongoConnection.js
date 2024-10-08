import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const initMongoConnection = async () => {
    try {
        const user = env("MONGODB_USER");
        const password = env("MONGODB_PASSWORD");
        const url = env("MONGODB_URL");
        const db = env("MONGODB_DB");
        const DB_URI = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=hw-2`;
        await mongoose.connect(DB_URI);
        console.log("Mongo connection successfully established!");
    }
    catch (error) {
        console.log("Mongodb connection error", error.message);
        throw error;
    }
};