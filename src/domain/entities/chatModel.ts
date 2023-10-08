import { ObjectId, ObjectIdSchemaDefinition } from "mongoose"
import { User } from "./userModel"
import { Designer } from "./designerModel"

export interface Chat {
        chatName?:string,
        user?:ObjectId,
        designer?:ObjectId,
        latestMessage?:ObjectId
      }
    
export interface Message {
  user?:ObjectId,
  designer?:ObjectId,
  content?:string,
  chat?:ObjectId
}

export interface newMessageRecieved{
  _id:string,
  user:User,
  designer:Designer,
  content:string,
  chat:ChatInMsg
}

export interface ChatInMsg{
  _id:string,
  user:User,
  designer:Designer
}