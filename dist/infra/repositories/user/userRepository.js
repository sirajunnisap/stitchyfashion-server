"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../database/model/userModel");
const errorHandle_1 = require("../../../utils/errorHandle");
const paymentModel_1 = require("../../database/model/paymentModel");
const userRepositoryImp = (UserModel) => {
    const createUser = async (user) => {
        // console.log(user,"creating user wiht user detail");
        let newUser = await UserModel.create(user);
        // console.log(newUser,"newuser");
        return newUser;
    };
    const findOneUserByEmail = async (email) => {
        const user = await UserModel.findOne({ email });
        return user;
    };
    const getAllUsers = async () => {
        const allUsers = await UserModel.find({}, { password: 0 });
        if (!allUsers)
            throw new errorHandle_1.AppError('Somthing went wrong ', 500);
        return allUsers;
    };
    const getAllPaymentedUsers = async () => {
        const allUsers = await paymentModel_1.paymentModel.find().populate('user').populate('selectedCourse')
            .populate({
            path: 'selectedCourse',
            populate: [
                { path: 'category', model: 'category' },
                { path: 'designer', model: 'designer' }
            ]
        });
        if (!allUsers)
            throw new errorHandle_1.AppError('Somthing went wrong ', 500);
        return allUsers;
    };
    const getUserById = async (userId) => {
        try {
            // console.log(userId,"userID");
            const user = await UserModel.findById(userId);
            if (!user) {
                console.log("user not found");
                return null;
            }
            // console.log(user,"user");
            return user;
        }
        catch (error) {
            console.error("error ", error);
            throw error;
        }
    };
    const updateUserById = async (id, userDetails) => {
        const user = await UserModel.findByIdAndUpdate(id, userDetails, { new: true });
        return user;
    };
    const updateIsBlock = async (id, action) => {
        let isBlocked;
        if (action === 'block')
            isBlocked = true;
        if (action === 'unblock')
            isBlocked = false;
        const blockedUser = await userModel_1.userModel.findByIdAndUpdate(id, { isBlocked }, { new: true });
        if (!blockedUser)
            throw new errorHandle_1.AppError('something went wrong when block the user', 500);
        return isBlocked;
    };
    const findUserIsBlock = async (email) => {
        const user = await userModel_1.userModel.findOne({ email, isBlocked: true });
        // console.log(user,"blocked user")
        if (user) {
            return true;
        }
        else {
            return false;
        }
    };
    const findUserIsMailVerified = async (email) => {
        const user = await userModel_1.userModel.findOne({ email, isMailVerified: false });
        if (user) {
            return true;
        }
        else {
            return false;
        }
    };
    const searchUser = async (searchQuery, sortCriteria) => {
        const searchresult = await userModel_1.userModel.find({ name: { $regex: searchQuery, $options: 'i' } }, { password: 0 }).sort(sortCriteria);
        return searchresult;
    };
    return { createUser, findOneUserByEmail, getAllUsers, getUserById, updateUserById, updateIsBlock, findUserIsBlock, findUserIsMailVerified, searchUser, getAllPaymentedUsers };
};
exports.default = userRepositoryImp;
