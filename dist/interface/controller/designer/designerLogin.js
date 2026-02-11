"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.designerLogin = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const designerModel_1 = require("../../../infra/database/model/designerModel");
const designerRepository_1 = __importDefault(require("../../../infra/repositories/designer/designerRepository"));
const loginDesigner_1 = require("../../../app/useCase/designer/loginDesigner");
const db = designerModel_1.designerModel;
const designerRepository = (0, designerRepository_1.default)(db);
const designerLogin = async (req, res) => {
    try {
        const designer = req.body;
        // console.log(designer,"designer");
        const { email, password } = designer;
        if (!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)) {
            throw new errorHandle_1.AppError('All fields are required', 400);
        }
        const designerToken = await (0, loginDesigner_1.loginDesigner)(designerRepository)(designer);
        // console.log(designerToken,"designerToken");
        res.status(200).json(designerToken);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
};
exports.designerLogin = designerLogin;
