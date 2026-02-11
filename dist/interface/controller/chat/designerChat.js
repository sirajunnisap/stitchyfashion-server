"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDesignerChatController = exports.accessChatController = void 0;
const chatModel_1 = require("../../../infra/database/model/chatModel");
const chatRepository_1 = require("../../../infra/repositories/chat/chatRepository");
const accessChat_1 = require("../../../app/useCase/chat/accessChat");
const db = chatModel_1.chatModel;
const ChatRepository = (0, chatRepository_1.ChatRepositoryImp)(db);
const accessChatController = async (req, res) => {
    var _a;
    const designerIdObject = req.body;
    const userId = Object.keys(designerIdObject)[0];
    const designerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.designer._id;
    console.log(userId, designerId, "userid and designer id for access chattttttttt");
    try {
        if (!userId || !designerId) {
            res.status(400).json({ message: "error" });
        }
        else {
            const chat = await (0, accessChat_1.accessChat)(ChatRepository)(userId, designerId);
            console.log(chat, "chat acceesseddd");
            res.status(201).json(chat);
        }
    }
    catch (error) {
    }
};
exports.accessChatController = accessChatController;
const fetchDesignerChatController = async (req, res) => {
    const designerId = req.params.id;
    console.log(designerId, "designer for chatt");
    try {
        const allChats = await (0, accessChat_1.getChatsDsgrUseCase)(ChatRepository)(designerId);
        res.status(202).json({ chats: allChats });
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchDesignerChatController = fetchDesignerChatController;
