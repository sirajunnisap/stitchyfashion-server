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
exports.fetchUserChatController = exports.accessChatController = void 0;
const chatModel_1 = require("../../../infra/database/model/chatModel");
const chatRepository_1 = require("../../../infra/repositories/chat/chatRepository");
const accessChat_1 = require("../../../app/useCase/chat/accessChat");
const db = chatModel_1.chatModel;
const ChatRepository = (0, chatRepository_1.ChatRepositoryImp)(db);
const accessChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const designerIdObject = req.body;
    const designerId = Object.keys(designerIdObject)[0];
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
    // console.log(userId,designerId,"userid and designer id for access chattttttttt");
    try {
        if (!userId || !designerId) {
            res.status(400).json({ message: "error" });
        }
        else {
            const chat = yield (0, accessChat_1.accessChat)(ChatRepository)(userId, designerId);
            // console.log(chat,"chat acceesseddd");
            res.status(201).json(chat);
        }
    }
    catch (error) {
    }
});
exports.accessChatController = accessChatController;
const fetchUserChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // console.log(userId,"userID for chatt");
    try {
        const allChats = yield (0, accessChat_1.getChatsUseCase)(ChatRepository)(userId);
        res.status(202).json({ chats: allChats });
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchUserChatController = fetchUserChatController;
