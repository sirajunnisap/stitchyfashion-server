"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGoogle = exports.loginUser = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const userValidationHelper_1 = require("./userValidationHelper");
const loginUser = (userRepository) => {
    return async (user) => {
        const { email, password } = user;
        const isUserExist = await userRepository.findOneUserByEmail(email); //check the user is already exist
        if (!isUserExist) {
            throw new errorHandle_1.AppError('User is not exist', 404);
        }
        // console.log(isUserExist,"useer");
        const isblockedUser = await userRepository.findUserIsBlock(email);
        if (isblockedUser)
            throw new errorHandle_1.AppError('user is blocked by admin', 404);
        const isMailVerifiedUser = await userRepository.findUserIsMailVerified(email);
        if (isMailVerifiedUser)
            throw new errorHandle_1.AppError('you need to verify your email', 404);
        const ispasswordCorrect = await (0, userValidationHelper_1.passwordCompare)(password, isUserExist.password);
        if (!ispasswordCorrect) {
            // console.log("password incorrect");
            throw new errorHandle_1.AppError('incorrect password', 401);
        }
        else {
            // console.log("password matched");
        }
        const userToken = await (0, userValidationHelper_1.createToken)(isUserExist);
        const verifiedUser = {
            token: userToken,
            userData: user
        };
        return verifiedUser;
    };
};
exports.loginUser = loginUser;
const loginGoogle = (userRepositoty) => {
    return async (user) => {
        // console.log(user,"user data ");
        const { email, name, phone } = user;
        let verifiedUser;
        const isUserExist = await userRepositoty.findOneUserByEmail(email);
        if (!isUserExist) {
            const newUser = await userRepositoty.createUser(user);
            const token = await (0, userValidationHelper_1.createToken)(newUser);
            verifiedUser = {
                token: token,
                userData: newUser,
                // message:'login success'
            };
            // console.log(verifiedUser,"verified user with token ,data");
            return verifiedUser;
        }
        const token = await (0, userValidationHelper_1.createToken)(isUserExist);
        verifiedUser = {
            token: token,
            userData: isUserExist,
        };
        return verifiedUser;
    };
};
exports.loginGoogle = loginGoogle;
