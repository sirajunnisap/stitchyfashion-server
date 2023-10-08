import { ChatRepository } from "../../../infra/repositories/chat/chatRepository";
import { MessageRepository } from "../../../infra/repositories/chat/messageRepository";

export const getChatsUseCase = (chatRepository:ChatRepository)=>async(userId:string)=>{
    const chats = await chatRepository.getAllUserChats(userId)
    return chats
}

export const getChatsDsgrUseCase = (chatRepository:ChatRepository)=>async(designerId:string)=>{
    const chats = await chatRepository.getAllDesignerChats(designerId)
    return chats
}


export const accessChat= (chatRepository:ChatRepository)=>async(userid:string,designerid:string)=>{
    const res = await chatRepository.createChat(userid,designerid)
    return res?res:null
}


export const sendingMessage = (messageRepository:MessageRepository)=>async(content:string,chatId:string,userId:string)=>{
    const message = await messageRepository.sendMsg(content,chatId,userId);
    return message
}

export const getAllMessages = (messageRepository:MessageRepository)=>async(chatId:string)=>{
    const messages = await messageRepository.getMsgsByChatId(chatId)
    return messages
}

export const dsgrSendingMessage = (messageRepository:MessageRepository)=>async(content:string,chatId:string,dsgrId:string)=>{
    const message = await messageRepository.dsgrSendMsg(content,chatId,dsgrId);
    return message
}