import mongoose, { Document, Model, Schema } from "mongoose";
import { Chat } from "../../../domain/entities/chatModel";


export type MongoDBChat = Model<Document<any, any, any> & Chat>

const chatSchema = new Schema<Chat>(
  {
    chatName: { 
      type: String, 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user' 
    },
    designer:{type:mongoose.Schema.Types.ObjectId, ref: 'designer' },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },

  },
  { timestamps: { createdAt: true } }

)

export const chatModel: MongoDBChat = mongoose.connection.model<Document<any, any, any> & Chat>('chat', chatSchema)
