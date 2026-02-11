"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageBychatId = exports.sendMessageDsgr = exports.sendMessage = void 0;
const messageModel_1 = require("../../../infra/database/model/messageModel");
const accessChat_1 = require("../../../app/useCase/chat/accessChat");
const messageRepository_1 = require("../../../infra/repositories/chat/messageRepository");
const db = messageModel_1.messageModel;
const messageRepository = (0, messageRepository_1.messageRepositoryImp)(db);
const sendMessage = async (req, res) => {
    var _a;
    const { content, chatId } = req.body;
    // console.log(content,chatId,"content chat id for send message ");
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
    // console.log(userId);
    if (!content || !chatId || !userId) {
        console.log("invalid data passed into request");
        return res.status(400);
    }
    const msg = await (0, accessChat_1.sendingMessage)(messageRepository)(content, chatId, userId);
    // console.log(msg,"messaggeee");
    res.json(msg);
};
exports.sendMessage = sendMessage;
const sendMessageDsgr = async (req, res) => {
    var _a;
    const { content, chatId } = req.body;
    // const chatidinobject =  Object.keys(chatId)[0];
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.designer._id;
    // console.log(userId,content,chatId);
    if (!content || !chatId || !userId) {
        console.log("invalid data passed into request");
        return res.status(400);
    }
    const msg = await (0, accessChat_1.dsgrSendingMessage)(messageRepository)(content, chatId, userId);
    // console.log(msg,"messaggeee");
    res.json(msg);
};
exports.sendMessageDsgr = sendMessageDsgr;
const getMessageBychatId = async (req, res) => {
    const chatId = req.params.chatId;
    console.log(chatId, "chatidddddddd");
    try {
        const message = await (0, accessChat_1.getAllMessages)(messageRepository)(chatId);
        if (message) {
            res.status(201).json(message);
        }
        else {
            res.status(404).json({ message: 'Not Found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getMessageBychatId = getMessageBychatId;
