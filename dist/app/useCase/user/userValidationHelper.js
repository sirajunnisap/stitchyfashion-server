"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.passwordCompare = exports.passwordHashing = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const passwordHashing = async (password) => {
    // console.log(password,"pawwdsf");
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    return hashedPassword;
};
exports.passwordHashing = passwordHashing;
const passwordCompare = async (plainTextPassword, hashedPassword) => {
    const password = await bcryptjs_1.default.compare(plainTextPassword, hashedPassword);
    return password;
};
exports.passwordCompare = passwordCompare;
const createToken = (user) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error('JWT secret key is not defined');
    }
    const token = jsonwebtoken_1.default.sign({ user }, secretKey, { expiresIn: '1day' });
    return token;
};
exports.createToken = createToken;
