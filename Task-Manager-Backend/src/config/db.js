import mongoose from "mongoose";
import { config } from "./config.js";


const dbconnection = async() =>{
  try{
await mongoose.connect(config.connectionstring)
console.log("mongoDB connect successfully")
}
catch(error){
 console.error("error while connecting database", error.message);
 process.exit(1);
}
}
export default dbconnection;