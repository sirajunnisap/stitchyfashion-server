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
exports.ChatRepositoryImp = void 0;
const ChatRepositoryImp = (chatModel) => {
    const createChat = (userId, designerId) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(designerId,userId,"designerid and userid for accessing chat");
        // const designerid:any=new mongoose.Types.ObjectId(designerId)
        // const userid:any= new mongoose.Types.ObjectId(userId)
        const isChat = yield chatModel.find({
            $and: [
                { user: userId }, { designer: designerId }
            ]
        })
            .populate('user').populate("designer");
        // .populate('latestMessage')
        console.log(isChat, "chats ");
        if (isChat.length > 0) {
            return isChat[0];
        }
        else {
            const chatData = {
                chatName: 'sender',
                user: userId,
                designer: designerId
            };
            // console.log(chatData,"chatData");
            const createdChat = yield chatModel.create(chatData);
            // console.log(createChat,"created chat");
            const fullChat = yield chatModel.findOne({ _id: createdChat._id }).populate('user', '-password').populate('designer', '-password');
            console.log(fullChat, 'chatttttttttttt');
            return fullChat;
        }
    });
    const getAllUserChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const userid = userId
            const chats = chatModel.find({ user: userId }).populate('designer');
            // .populate('latestMessage').sort({updatedAt:-1})
            return chats;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const getAllDesignerChats = (designerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chats = chatModel.find({ designer: designerId }).populate('user')
                .populate('latestMessage').sort({ updatedAt: -1 });
            return chats;
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    });
    return { createChat, getAllUserChats, getAllDesignerChats };
};
exports.ChatRepositoryImp = ChatRepositoryImp;
