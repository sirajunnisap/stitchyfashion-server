import mongoose , { Document, Model, Schema } from "mongoose";
import { Message } from "../../../domain/entities/chatModel";

export type MongoDBMessage = Model<Document<any, any, any >& Message>
const messageSchema = new Schema<Message>({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    designer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'designer'
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
}
   ,
    {timestamps:{createdAt:true}}
)

export const messageModel:MongoDBMessage = mongoose.connection.model<Document<any,any,any>& Message>('message',messageSchema)