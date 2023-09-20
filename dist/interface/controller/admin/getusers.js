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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUser = exports.getAllUsers = void 0;
const getUsers_1 = require("../../../app/useCase/admin/getUsers");
const errorHandle_1 = require("../../../utils/errorHandle");
const userModel_1 = require("../../../infra/database/model/userModel");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, getUsers_1.getUsers)(userRepository)();
        if (!allUsers) {
            throw new errorHandle_1.AppError("something went wrong", 400);
        }
        res.status(200).json(allUsers);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getAllUsers = getAllUsers;
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, action } = req.body;
        console.log(userId, action, "userid action");
        if (!userId || !action)
            throw new errorHandle_1.AppError("not found", 404);
        const blockedUser = yield (0, getUsers_1.isBlockUser)(userRepository)(userId, action);
        if (blockedUser === null)
            throw new errorHandle_1.AppError("something went wrong while fetch the user", 500);
        if (blockedUser === true) {
            res.status(200).json({ message: "user blocked successfully" });
            return;
        }
        else if (blockedUser === false) {
            res.status(200).json({ message: "user unblocked successfully" });
            return;
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.blockUser = blockUser;
