"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyEmail = exports.userSignup = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const userSignUp_1 = require("../../../app/useCase/user/userSignUp");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const errorHandle_1 = require("../../../utils/errorHandle");
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailValidator = __importStar(require("email-validator"));
const db = userModel_1.userModel; //Instantiate MongoDB connection
const userRepository = (0, userRepository_1.default)(db);
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user.name || !user.email || !user.password ||
            /^\s*$/.test(user.name) ||
            /^\s*$/.test(user.email) ||
            /^\s*$/.test(user.password)) {
            throw new errorHandle_1.AppError('all field are required', 400);
        }
        if (user.password.length < 6) {
            throw new errorHandle_1.AppError('password must be at least 6 digits', 400);
        }
        console.log(user, 'user details');
        const createUser = yield (0, userSignUp_1.signupUser)(userRepository)(user);
        if (!createUser) {
            res.status(500).json({ message: 'something went wrong' });
        }
        if (emailValidator.validate(user.email)) {
            console.log(`${user.email} is a valid email address.`);
            sendVerifyEmail(req.body.name, req.body.email, createUser._id);
        }
        else {
            console.log(`${user.email} is not a valid email address.`);
        }
        res.status(200).json({ message: 'user created successfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'somthing went wrong' });
    }
});
exports.userSignup = userSignup;
const sendVerifyEmail = (name, email, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'sirajunnisap4@gmail.com',
                pass: 'ifqfsqtpuxkghyld'
            }
        });
        const mailOptions = {
            from: 'sirajunnisap4@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<p>Hi ${name}, please click <a href="http://localhost:3000/verifyEmail/${user_id}">here</a> to verify your email.</p>`
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email has been sent:", info.response);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log(userId, "userid in params");
        const updateInfo = yield userModel_1.userModel.updateOne({ _id: userId }, { $set: { isMailVerified: true } });
        if (updateInfo) {
            return res.json({ message: "email verified", updateInfo });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'internal server error' });
    }
});
exports.verifyEmail = verifyEmail;
