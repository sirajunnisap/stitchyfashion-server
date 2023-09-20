"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const errorHandle_1 = require("../../../utils/errorHandle");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const createToken = (designer) => {
    const secretKey = process.env.JWT_SECRET_KEY_DESIGNER;
    if (!secretKey) {
        throw new errorHandle_1.AppError('JWT secret key is not defiened', 401);
    }
    const token = jsonwebtoken_1.default.sign({ designer }, secretKey, { expiresIn: '1h' });
    return token;
};
exports.createToken = createToken;
