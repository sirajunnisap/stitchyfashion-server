import { Message } from "../../../domain/entities/chatModel"
import { chatModel } from "../../database/model/chatModel"
import { MongoDBMessage } from "../../database/model/messageModel"

export type MessageRepository = {
    sendMsg:(content:string,chatId:string,userId:string)=>Promise<Message>
    dsgrSendMsg:(content:string,chatId:string,designerId:string)=>Promise<Message>
    getMsgsByChatId:(chatId:string)=>Promise<Message[]>
}

export const messageRepositoryImp = (messageModel:MongoDBMessage):MessageRepository=>{
    const sendMsg = async(content:string,chatId:any,userId:any):Promise<Message>=>{
       
        // console.log(content,chatId,userId);
        
        const newChat:Message = {
            content:content,
            chat:chatId,
            user:userId
        }
        let message = await messageModel.create(newChat)

        message  = await message.populate('user')
        message = await message.populate('designer')
        message = await message.populate('chat')
        message = await message.populate('chat.user')
        message = await message.populate('chat.designer')

        await chatModel.updateOne({_id:chatId},{$set:{latestMessage:message}})

        // console.log(message,"message updateddddddddd");

        return message
    }

    const dsgrSendMsg = async(content:string,chatId:any,designerId:any):Promise<Message>=>{
       

        // console.log(content,chatId,designerId,"messssssssssssageeeeeee");
        
        const newChat:Message = {
            content:content,
            chat:chatId,
            designer:designerId
        }
        let message = await messageModel.create(newChat)

        message  = await message.populate('user')
        message = await message.populate('designer')
        message = await message.populate('chat')
        message = await message.populate('chat.user')
        message = await message.populate('chat.designer')

        await chatModel.updateOne({_id:chatId},{$set:{latestMessage:message}})

        // console.log(message,"message updateddddddddd");
        
        return message
    }

    const getMsgsByChatId = async(chatId:string):Promise<Message[]>=>{
        
        // console.log(chatId,"chat id  for get all message");
        
        const message = await messageModel.find({chat:chatId}).populate('user').populate('designer').populate('chat')
        // console.log(message,"messages");
        
        // .populate('user')
        // 
        // 
        return message
    }
    return{sendMsg,dsgrSendMsg,getMsgsByChatId}
}