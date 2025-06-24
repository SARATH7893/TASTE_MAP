import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import postRoutes from "./routes/post.routes.js"
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors({origin:'*'}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes)
app.use(postRoutes)

const start=async()=>{
    const connectDb=await mongoose.connect(process.env.MONGO_URL)
    console.log("db connected")
    app.listen(9090,()=>{
        console.log('server is running on port 9090')
    })
}
// console.log("Cloud name:", process.env.CLOUD_NAME);
// console.log("API key:", process.env.CLOUD_API_KEY);
// console.log("API secret:", process.env.CLOUD_API_SECRET);


start()