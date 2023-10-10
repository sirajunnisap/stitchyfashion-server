"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepositoryImp = void 0;
const chatModel_1 = require("../../database/model/chatModel");
const messageRepositoryImp = (messageModel) => {
    const sendMsg = (content, chatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(content,chatId,userId);
        const newChat = {
            content: content,
            chat: chatId,
            user: userId
        };
        let message = yield messageModel.create(newChat);
        message = yield message.populate('user');
        message = yield message.populate('designer');
        message = yield message.populate('chat');
        message = yield message.populate('chat.user');
        message = yield message.populate('chat.designer');
        yield chatModel_1.chatModel.updateOne({ _id: chatId }, { $set: { latestMessage: message } });
        // console.log(message,"message updateddddddddd");
        return message;
    });
    const dsgrSendMsg = (content, chatId, designerId) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(content,chatId,designerId,"messssssssssssageeeeeee");
        const newChat = {
            content: content,
            chat: chatId,
            designer: designerId
        };
        let message = yield messageModel.create(newChat);
        message = yield message.populate('user');
        message = yield message.populate('designer');
        message = yield message.populate('chat');
        message = yield message.populate('chat.user');
        message = yield message.populate('chat.designer');
        yield chatModel_1.chatModel.updateOne({ _id: chatId }, { $set: { latestMessage: message } });
        // console.log(message,"message updateddddddddd");
        return message;
    });
    const getMsgsByChatId = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(chatId,"chat id  for get all message");
        const message = yield messageModel.find({ chat: chatId }).populate('user').populate('designer').populate('chat');
        // console.log(message,"messages");
        // .populate('user')
        // 
        // 
        return message;
    });
    return { sendMsg, dsgrSendMsg, getMsgsByChatId };
};
exports.messageRepositoryImp = messageRepositoryImp;
