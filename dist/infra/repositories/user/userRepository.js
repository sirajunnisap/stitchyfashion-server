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
const userModel_1 = require("../../database/model/userModel");
const errorHandle_1 = require("../../../utils/errorHandle");
const paymentModel_1 = require("../../database/model/paymentModel");
const userRepositoryImp = (UserModel) => {
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(user,"creating user wiht user detail");
        let newUser = yield UserModel.create(user);
        // console.log(newUser,"newuser");
        return newUser;
    });
    const findOneUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ email });
        return user;
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield UserModel.find({}, { password: 0 });
        if (!allUsers)
            throw new errorHandle_1.AppError('Somthing went wrong ', 500);
        return allUsers;
    });
    const getAllPaymentedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield paymentModel_1.paymentModel.find().populate('user').populate('selectedCourse')
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
    });
    const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log(userId,"userID");
            const user = yield UserModel.findById(userId);
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
    });
    const updateUserById = (id, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel.findByIdAndUpdate(id, userDetails, { new: true });
        return user;
    });
    const updateIsBlock = (id, action) => __awaiter(void 0, void 0, void 0, function* () {
        let isBlocked;
        if (action === 'block')
            isBlocked = true;
        if (action === 'unblock')
            isBlocked = false;
        const blockedUser = yield userModel_1.userModel.findByIdAndUpdate(id, { isBlocked }, { new: true });
        if (!blockedUser)
            throw new errorHandle_1.AppError('something went wrong when block the user', 500);
        return isBlocked;
    });
    const findUserIsBlock = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.userModel.findOne({ email, isBlocked: true });
        // console.log(user,"blocked user")
        if (user) {
            return true;
        }
        else {
            return false;
        }
    });
    const findUserIsMailVerified = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.userModel.findOne({ email, isMailVerified: false });
        if (user) {
            return true;
        }
        else {
            return false;
        }
    });
    const searchUser = (searchQuery, sortCriteria) => __awaiter(void 0, void 0, void 0, function* () {
        const searchresult = yield userModel_1.userModel.find({ name: { $regex: searchQuery, $options: 'i' } }, { password: 0 }).sort(sortCriteria);
        return searchresult;
    });
    return { createUser, findOneUserByEmail, getAllUsers, getUserById, updateUserById, updateIsBlock, findUserIsBlock, findUserIsMailVerified, searchUser, getAllPaymentedUsers };
};
exports.default = userRepositoryImp;
