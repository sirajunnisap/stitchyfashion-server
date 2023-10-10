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
exports.loginGoogle = exports.loginUser = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const userValidationHelper_1 = require("./userValidationHelper");
const loginUser = (userRepository) => {
    return (user) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = user;
        const isUserExist = yield userRepository.findOneUserByEmail(email); //check the user is already exist
        if (!isUserExist) {
            throw new errorHandle_1.AppError('User is not exist', 404);
        }
        // console.log(isUserExist,"useer");
        const isblockedUser = yield userRepository.findUserIsBlock(email);
        if (isblockedUser)
            throw new errorHandle_1.AppError('user is blocked by admin', 404);
        const isMailVerifiedUser = yield userRepository.findUserIsMailVerified(email);
        if (isMailVerifiedUser)
            throw new errorHandle_1.AppError('you need to verify your email', 404);
        const ispasswordCorrect = yield (0, userValidationHelper_1.passwordCompare)(password, isUserExist.password);
        if (!ispasswordCorrect) {
            // console.log("password incorrect");
            throw new errorHandle_1.AppError('incorrect password', 401);
        }
        else {
            // console.log("password matched");
        }
        const userToken = yield (0, userValidationHelper_1.createToken)(isUserExist);
        const verifiedUser = {
            token: userToken,
            userData: user
        };
        return verifiedUser;
    });
};
exports.loginUser = loginUser;
const loginGoogle = (userRepositoty) => {
    return (user) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(user,"user data ");
        const { email, name, phone } = user;
        let verifiedUser;
        const isUserExist = yield userRepositoty.findOneUserByEmail(email);
        if (!isUserExist) {
            const newUser = yield userRepositoty.createUser(user);
            const token = yield (0, userValidationHelper_1.createToken)(newUser);
            verifiedUser = {
                token: token,
                userData: newUser,
                // message:'login success'
            };
            // console.log(verifiedUser,"verified user with token ,data");
            return verifiedUser;
        }
        const token = yield (0, userValidationHelper_1.createToken)(isUserExist);
        verifiedUser = {
            token: token,
            userData: isUserExist,
        };
        return verifiedUser;
    });
};
exports.loginGoogle = loginGoogle;
