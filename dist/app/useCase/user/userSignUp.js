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
exports.signupUser = void 0;
const userValidationHelper_1 = require("./userValidationHelper");
const errorHandle_1 = require("../../../utils/errorHandle");
const signupUser = (userRepository) => {
    //return function for create new user
    return (user) => __awaiter(void 0, void 0, void 0, function* () {
        const hashpassword = yield (0, userValidationHelper_1.passwordHashing)(user === null || user === void 0 ? void 0 : user.password);
        // console.log(user.password,"password");
        let newUser = Object.assign(Object.assign({}, user), { password: hashpassword });
        const isUserExist = yield userRepository.findOneUserByEmail(user.email);
        if (isUserExist) {
            throw new errorHandle_1.AppError('user is already exist', 409);
        }
        const createdUser = yield userRepository.createUser(newUser); //this method will create a new user
        return createdUser;
    });
};
exports.signupUser = signupUser;
