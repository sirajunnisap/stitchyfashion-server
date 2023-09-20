import express, { Application,Request,Response,NextFunction, ErrorRequestHandler }  from "express";
import { Server } from "http";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import createHtttpError from "http-errors";

import connectDB from "./infra/database/dbConfig"

import userRoute from "./interface/route/user";
import adminRoute from "./interface/route/admin";
import designerRoute from "./interface/route/designer";

const app: Application = express()


//Enable CORS for all routes
app.use(cors())
app.use(express.json({limit:'500mb'}));
app.use(express.urlencoded({extended:true,limit:'500mb'}));

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

dotenv.config({ path: path.resolve(__dirname, '../.env')});

//mongodb connection
connectDB(process.env.MONGODB_CONNECTION_URL || '');

//setup routes
app.use('/',userRoute);
app.use('/admin',adminRoute);
app.use('/designer',designerRoute);

//page not found error handling
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.send(new createHtttpError.NotFound())
})
const errorHandler:ErrorRequestHandler=(error,req,res,next)=>{
    res.status(error.status || 500)
    res.send({
        status:res.status || 500,
        message:error.message
    }) 
}
app.use(errorHandler)


const PORT: number = Number(process.env.PORT) || 4000
const server: Server = app.listen(4000,()=>console.log(`server is running ${PORT}`))


