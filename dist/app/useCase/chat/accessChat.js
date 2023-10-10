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
exports.dsgrSendingMessage = exports.getAllMessages = exports.sendingMessage = exports.accessChat = exports.getChatsDsgrUseCase = exports.getChatsUseCase = void 0;
const getChatsUseCase = (chatRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chatRepository.getAllUserChats(userId);
    return chats;
});
exports.getChatsUseCase = getChatsUseCase;
const getChatsDsgrUseCase = (chatRepository) => (designerId) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chatRepository.getAllDesignerChats(designerId);
    return chats;
});
exports.getChatsDsgrUseCase = getChatsDsgrUseCase;
const accessChat = (chatRepository) => (userid, designerid) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield chatRepository.createChat(userid, designerid);
    return res ? res : null;
});
exports.accessChat = accessChat;
const sendingMessage = (messageRepository) => (content, chatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageRepository.sendMsg(content, chatId, userId);
    return message;
});
exports.sendingMessage = sendingMessage;
const getAllMessages = (messageRepository) => (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messageRepository.getMsgsByChatId(chatId);
    return messages;
});
exports.getAllMessages = getAllMessages;
const dsgrSendingMessage = (messageRepository) => (content, chatId, dsgrId) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageRepository.dsgrSendMsg(content, chatId, dsgrId);
    return message;
});
exports.dsgrSendingMessage = dsgrSendingMessage;
