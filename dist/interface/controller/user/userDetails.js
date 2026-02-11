"use strict";
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
const userProfile = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
        // console.log(userId,"userId dddddd");
        const userData = await (0, getUsers_1.getUserById)(userRepository)(userId);
        // console.log(userData,"userData");
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.userProfile = userProfile;
const profileUpdate = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
        // console.log(userId,"userIdforupdation");
        const data = req.body;
        // console.log(data,"userData for profile updation");
        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            image: data.image
        };
        const updatedProfile = await (0, userProfile_1.updateProfile)(userRepository)(userId, userData);
        // console.log(updatedProfile,"updated profile");
        if (updatedProfile) {
            // console.log("user data updated successfully");
            res.status(200).json(updatedProfile);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.profileUpdate = profileUpdate;
