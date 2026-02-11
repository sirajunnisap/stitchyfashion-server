"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsgrSendingMessage = exports.getAllMessages = exports.sendingMessage = exports.accessChat = exports.getChatsDsgrUseCase = exports.getChatsUseCase = void 0;
const getChatsUseCase = (chatRepository) => async (userId) => {
    const chats = await chatRepository.getAllUserChats(userId);
    return chats;
};
exports.getChatsUseCase = getChatsUseCase;
const getChatsDsgrUseCase = (chatRepository) => async (designerId) => {
    const chats = await chatRepository.getAllDesignerChats(designerId);
    return chats;
};
exports.getChatsDsgrUseCase = getChatsDsgrUseCase;
const accessChat = (chatRepository) => async (userid, designerid) => {
    const res = await chatRepository.createChat(userid, designerid);
    return res ? res : null;
};
exports.accessChat = accessChat;
const sendingMessage = (messageRepository) => async (content, chatId, userId) => {
    const message = await messageRepository.sendMsg(content, chatId, userId);
    return message;
};
exports.sendingMessage = sendingMessage;
const getAllMessages = (messageRepository) => async (chatId) => {
    const messages = await messageRepository.getMsgsByChatId(chatId);
    return messages;
};
exports.getAllMessages = getAllMessages;
const dsgrSendingMessage = (messageRepository) => async (content, chatId, dsgrId) => {
    const message = await messageRepository.dsgrSendMsg(content, chatId, dsgrId);
    return message;
};
exports.dsgrSendingMessage = dsgrSendingMessage;
