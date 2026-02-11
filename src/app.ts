import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express";
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

import { Socket } from 'socket.io'
import { newMessageRecieved } from "./domain/entities/chatModel";

const app: Application = express()


//Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000', 
        process.env.CLIENT_URL as string],
    // origin: "*"
}));

// app.use(cors({
//     origin: ['http://localhost:3000', 
//         'https://stitchy-inky.vercel.app'],
//     // origin: "*"
// }));
  
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

dotenv.config({ path: path.resolve(__dirname, '../.env') });

//mongodb connection
connectDB(process.env.MONGODB_CONNECTION_URL || '');

//setup routes
app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use('/designer', designerRoute);

//page not found error handling
app.use((req: Request, res: Response, next: NextFunction) => {
    res.send(new createHtttpError.NotFound())
})
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
        status: res.status || 500,
        message: error.message
    })
}
app.use(errorHandler)


const PORT: number = Number(process.env.PORT) || 4000
const server: Server = app.listen(4000, () => console.log(`server is running ${PORT}`))


const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: ['https://stitchy-inky.vercel.app','http://localhost:3000'
        ]
        // origin: "*"
    },
});

io.on("connection", (socket: any) => {
    // console.log("connected to socket.io");

    socket.on("setup", (userId: string) => {
        socket.join(userId); ``
        console.log("usr joined room", userId);
        socket.emit("connected");
    })

    socket.on('join chat', (room: string) => {
        socket.join(room)
        console.log("User Joined room : " + room);
    })

    socket.on('new message', (newMessageReceived: newMessageRecieved) => {

        console.log(newMessageReceived,"new message res.content");
        
        let chat = newMessageReceived?.chat
        console.log('new message', newMessageReceived?.user);
        const sender = newMessageReceived?.user ? newMessageReceived?.user : newMessageReceived?.designer
        console.log('sender is :', sender);
        console.log('newMessage Recieved.chat,user ', newMessageReceived.chat?.user);


        if (sender?._id === newMessageReceived?.chat?.user._id) {
            console.log('user is the sender');

            socket.in(chat?.designer._id).emit('message recieved', newMessageReceived)
        }

        if (chat?._id === newMessageReceived?.chat?.designer._id) {
            console.log('designer is the sender');
            socket.in(chat?.user._id).emit('message recievd', newMessageReceived)

        }

        if (chat?._id === newMessageReceived?.user?._id) return
        socket.in(chat?.user._id).emit('message recieved', newMessageReceived);


        socket.on("typing",(currentId: string) => socket.to(currentId).emit("typing"))
        socket.on("stoptyping",(currentId: string) => socket.to(currentId).emit("stoptyping"))

        
        if (chat?._id === newMessageReceived?.designer?._id) return
        socket.in(chat?.designer._id).emit('message recieved', newMessageReceived)

    })

})