import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const PORT = 3000;
const app = express();

//DB Configuration
const DB_url =  process.env.MONGO_URL
mongoose.connect(DB_url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT,()=>{
    console.log("==================================")
    console.log(`Server listening to port ${PORT}`)
    console.log("==================================")

})

app.use("/api/user",userRoutes)