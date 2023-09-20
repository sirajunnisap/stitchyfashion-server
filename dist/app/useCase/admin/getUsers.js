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
exports.isBlockUser = exports.getUserById = exports.getUsers = void 0;
// import { updateUserDetails } from "../../../interface/controller/admin/adminLoginController";
const getUsers = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getAllUsers();
    return users;
});
exports.getUsers = getUsers;
const getUserById = (userRepository) => {
    return (userId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userId, "userId");
        const user = yield userRepository.getUserById(userId);
        console.log(user, "user");
        return user;
    });
};
exports.getUserById = getUserById;
const isBlockUser = (userRepository) => {
    return (userId, action) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userId, action);
        const blockedUser = yield userRepository.updateIsBlock(userId, action);
        return blockedUser;
    });
};
exports.isBlockUser = isBlockUser;
// export const editUser = (userRepository:userRepository)=>{
//     async(id:string,userDetails:any):Promise<void>=>{
//        await userRepository.updateUserById(id,userDetails);
// }
// }
