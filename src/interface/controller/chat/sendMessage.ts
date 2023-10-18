import { Request,Response } from "express";
import { CustomRequest } from "../../middleware/authMiddleware";
import { messageModel } from "../../../infra/database/model/messageModel";
import { userModel } from "../../../infra/database/model/userModel";
import { chatModel } from "../../../infra/database/model/chatModel";
import { dsgrSendingMessage, getAllMessages, sendingMessage } from "../../../app/useCase/chat/accessChat";
import { messageRepositoryImp } from "../../../infra/repositories/chat/messageRepository";


const db = messageModel
const messageRepository = messageRepositoryImp(db)
export const sendMessage = async(req:CustomRequest,res:Response)=>{
    const {content,chatId} = req.body
    // console.log(content,chatId,"content chat id for send message ");
   
    const userId = req.user?.user._id
    // console.log(userId);
    
    if(!content || !chatId || !userId){
        console.log("invalid data passed into request");
        return res.status(400);
    }

    const msg = await sendingMessage(messageRepository)(content,chatId,userId)
    // console.log(msg,"messaggeee");
    res.json(msg)
 
   
}

export const sendMessageDsgr = async(req:CustomRequest,res:Response)=>{
    
    const {content,chatId} = req.body
    // const chatidinobject =  Object.keys(chatId)[0];
    const userId = req.user?.designer._id
    // console.log(userId,content,chatId);
    
    if(!content || !chatId || !userId){
        console.log("invalid data passed into request");
        return res.status(400);
    }

    const msg = await dsgrSendingMessage(messageRepository)(content,chatId,userId)
    // console.log(msg,"messaggeee");
    res.json(msg)

   
}

export const getMessageBychatId = async (req: CustomRequest, res: Response) => {
    const chatId = req.params.chatId;
    console.log(chatId, "chatidddddddd");

    try {
        const message = await getAllMessages(messageRepository)(chatId);
        if (message) {
            res.status(201).json(message);
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
