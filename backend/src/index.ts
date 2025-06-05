
import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import connectDB from './db_connection/DBconnect';

dotenv.config({
    path : './.env'
})


const app = express();
app.use(cors())
app.use(express.json())

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error: ",error)
    })
    app.listen(5000,()=>{
        console.log(`Server is running at port : 5000`)
    })
})


import userRouter from "./router/user.route"
import bankRouter from "./router/bank.route"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/bank",bankRouter)

export default app;