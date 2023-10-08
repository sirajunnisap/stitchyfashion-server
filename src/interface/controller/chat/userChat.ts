


import {Request, Response } from "express";
import { chatModel } from "../../../infra/database/model/chatModel";
import { ChatRepositoryImp } from "../../../infra/repositories/chat/chatRepository";
import { CustomRequest } from "../../middleware/authMiddleware";
import { accessChat, getChatsDsgrUseCase, getChatsUseCase } from "../../../app/useCase/chat/accessChat";


const db = chatModel
const ChatRepository = ChatRepositoryImp(db)

export const accessChatController = async(req:CustomRequest,res:Response)=>{
    const designerIdObject = req.body;
        const designerId= Object.keys(designerIdObject)[0];
    const userId = req.user?.user._id

    // console.log(userId,designerId,"userid and designer id for access chattttttttt");
    try {
        if(!userId||!designerId){
            res.status(400).json({message:"error"});

        }else{
            const chat = await accessChat(ChatRepository)(userId,designerId)
            // console.log(chat,"chat acceesseddd");
            
            res.status(201).json(chat)
        }
    } catch (error) {
        
    }
}

export const fetchUserChatController = async(req:Request,res:Response)=>{
    const userId:string = req.params.id
    // console.log(userId,"userID for chatt");

    try {
        const allChats = await getChatsUseCase(ChatRepository)(userId)
        res.status(202).json({chats:allChats})
    } catch (error) {
        console.log(error);
        
    }
}




