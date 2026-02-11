"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const adminModel_1 = require("../../../infra/database/model/adminModel");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const errorHandle_1 = require("../../../utils/errorHandle");
const adminLogin_1 = require("../../../app/useCase/admin/adminLogin");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const userModel_1 = require("../../../infra/database/model/userModel");
const db = adminModel_1.adminModel;
const adminRepository = (0, adminRepository_1.default)(db);
const dbuser = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(dbuser);
const adminLogin = async (req, res) => {
    try {
        const admin = req.body;
        console.log(admin, "admin");
        const { email, password } = admin;
        if (!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)) {
            throw new errorHandle_1.AppError('All fields are required', 400);
        }
        const adminToken = await (0, adminLogin_1.loginAdmin)(adminRepository)(admin);
        console.log(adminToken, "admintoken");
        res.status(200).json(adminToken);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
};
exports.adminLogin = adminLogin;
