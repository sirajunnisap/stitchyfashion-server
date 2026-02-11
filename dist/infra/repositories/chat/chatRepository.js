"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepositoryImp = void 0;
const ChatRepositoryImp = (chatModel) => {
    const createChat = async (userId, designerId) => {
        // console.log(designerId,userId,"designerid and userid for accessing chat");
        // const designerid:any=new mongoose.Types.ObjectId(designerId)
        // const userid:any= new mongoose.Types.ObjectId(userId)
        const isChat = await chatModel.find({
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
            const createdChat = await chatModel.create(chatData);
            // console.log(createChat,"created chat");
            const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate('user', '-password').populate('designer', '-password');
            console.log(fullChat, 'chatttttttttttt');
            return fullChat;
        }
    };
    const getAllUserChats = async (userId) => {
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
    };
    const getAllDesignerChats = async (designerId) => {
        try {
            const chats = chatModel.find({ designer: designerId }).populate('user')
                .populate('latestMessage').sort({ updatedAt: -1 });
            return chats;
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    };
    return { createChat, getAllUserChats, getAllDesignerChats };
};
exports.ChatRepositoryImp = ChatRepositoryImp;
