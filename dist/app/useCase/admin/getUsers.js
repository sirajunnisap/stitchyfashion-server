"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsecase = exports.isBlockUser = exports.getUserById = exports.getPaymentedUsers = exports.getUsers = void 0;
// import { updateUserDetails } from "../../../interface/controller/admin/adminLoginController";
const getUsers = (userRepository) => async () => {
    const users = await userRepository.getAllUsers();
    return users;
};
exports.getUsers = getUsers;
const getPaymentedUsers = (userRepository) => async () => {
    const users = await userRepository.getAllPaymentedUsers();
    return users;
};
exports.getPaymentedUsers = getPaymentedUsers;
const getUserById = (userRepository) => {
    return async (userId) => {
        // console.log(userId,"userId");
        const user = await userRepository.getUserById(userId);
        // console.log(user,"user");
        return user;
    };
};
exports.getUserById = getUserById;
const isBlockUser = (userRepository) => {
    return async (userId, action) => {
        // console.log(userId,action);
        const blockedUser = await userRepository.updateIsBlock(userId, action);
        return blockedUser;
    };
};
exports.isBlockUser = isBlockUser;
const searchUsecase = (userRepository) => async (searchQuery, sortCriteria) => {
    const users = await userRepository.searchUser(searchQuery, sortCriteria);
    return users;
};
exports.searchUsecase = searchUsecase;
