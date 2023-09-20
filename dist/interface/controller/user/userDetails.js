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
exports.profileUpdate = exports.userProfile = void 0;
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const userModel_1 = require("../../../infra/database/model/userModel");
const getUsers_1 = require("../../../app/useCase/admin/getUsers");
const userProfile_1 = require("../../../app/useCase/user/userProfile");
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
        console.log(userId, "userId");
        const userData = yield (0, getUsers_1.getUserById)(userRepository)(userId);
        console.log(userData, "userData");
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.userProfile = userProfile;
const profileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.user._id;
        console.log(userId, "userIdforupdation");
        const data = req.body;
        console.log(data, "userData for profile updation");
        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            image: data.image
        };
        const updatedProfile = yield (0, userProfile_1.updateProfile)(userRepository)(userId, userData);
        console.log(updatedProfile, "updated profile");
        if (updatedProfile) {
            console.log("user data updated successfully");
            res.status(200).json(updatedProfile);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.profileUpdate = profileUpdate;
