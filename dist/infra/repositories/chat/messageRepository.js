"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepositoryImp = void 0;
const chatModel_1 = require("../../database/model/chatModel");
const messageRepositoryImp = (messageModel) => {
    const sendMsg = async (content, chatId, userId) => {
        // console.log(content,chatId,userId);
        const newChat = {
            content: content,
            chat: chatId,
            user: userId
        };
        let message = await messageModel.create(newChat);
        message = await message.populate('user');
        message = await message.populate('designer');
        message = await message.populate('chat');
        message = await message.populate('chat.user');
        message = await message.populate('chat.designer');
        await chatModel_1.chatModel.updateOne({ _id: chatId }, { $set: { latestMessage: message } });
        // console.log(message,"message updateddddddddd");
        return message;
    };
    const dsgrSendMsg = async (content, chatId, designerId) => {
        // console.log(content,chatId,designerId,"messssssssssssageeeeeee");
        const newChat = {
            content: content,
            chat: chatId,
            designer: designerId
        };
        let message = await messageModel.create(newChat);
        message = await message.populate('user');
        message = await message.populate('designer');
        message = await message.populate('chat');
        message = await message.populate('chat.user');
        message = await message.populate('chat.designer');
        await chatModel_1.chatModel.updateOne({ _id: chatId }, { $set: { latestMessage: message } });
        // console.log(message,"message updateddddddddd");
        return message;
    };
    const getMsgsByChatId = async (chatId) => {
        // console.log(chatId,"chat id  for get all message");
        const message = await messageModel.find({ chat: chatId }).populate('user').populate('designer').populate('chat');
        // console.log(message,"messages");
        // .populate('user')
        // 
        // 
        return message;
    };
    return { sendMsg, dsgrSendMsg, getMsgsByChatId };
};
exports.messageRepositoryImp = messageRepositoryImp;
