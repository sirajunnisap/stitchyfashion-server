"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUpdate = exports.adminProfile = void 0;
const adminModel_1 = require("../../../infra/database/model/adminModel");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const adminProfile_1 = require("../../../app/useCase/admin/adminProfile");
const db = adminModel_1.adminModel;
const adminRepository = (0, adminRepository_1.default)(db);
const adminProfile = async (req, res) => {
    var _a;
    try {
        const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.admin._id;
        console.log(adminId, "adminId");
        const adminData = await (0, adminProfile_1.AdminById)(adminRepository)(adminId);
        res.status(200).json(adminData);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.adminProfile = adminProfile;
const profileUpdate = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.admin._id;
        console.log(userId, "userIdforupdation");
        const data = req.body;
        console.log(data, "userData for profile updation");
        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            image: data.image,
        };
        const updatedProfile = await (0, adminProfile_1.updateProfile)(adminRepository)(userId, userData);
        console.log(updatedProfile, "updated profile");
        if (updatedProfile) {
            console.log("user data updated successfully");
            res.status(200).json(updatedProfile);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.profileUpdate = profileUpdate;
