"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = void 0;
const userValidationHelper_1 = require("./userValidationHelper");
const errorHandle_1 = require("../../../utils/errorHandle");
const signupUser = (userRepository) => {
    //return function for create new user
    return async (user) => {
        const hashpassword = await (0, userValidationHelper_1.passwordHashing)(user === null || user === void 0 ? void 0 : user.password);
        // console.log(user.password,"password");
        let newUser = { ...user, password: hashpassword };
        const isUserExist = await userRepository.findOneUserByEmail(user.email);
        if (isUserExist) {
            throw new errorHandle_1.AppError('user is already exist', 409);
        }
        const createdUser = await userRepository.createUser(newUser); //this method will create a new user
        return createdUser;
    };
};
exports.signupUser = signupUser;
