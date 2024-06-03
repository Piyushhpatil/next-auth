import { error } from "console";
import mongoose, { Mongoose, mongo } from "mongoose";
import { connected } from "process";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("Mongo connected")
        })
        connection.on('error', () => {
            console.log("Mongo connection error, please make sure db is up and running: " + error);
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong in connecting to DB");
        console.log(error)
    }
}