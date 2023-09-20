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
exports.verifyEmail = exports.designerRegister = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailValidator = __importStar(require("email-validator"));
const designerModel_1 = require("../../../infra/database/model/designerModel");
const designerRepository_1 = __importDefault(require("../../../infra/repositories/designer/designerRepository"));
const addDesigner_1 = require("../../../app/useCase/admin/addDesigner");
const db = designerModel_1.designerModel; //Instantiate MongoDB connection
const designerRepository = (0, designerRepository_1.default)(db);
const designerRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const designer = req.body;
        if (!designer.name || !designer.email || !designer.password ||
            /^\s*$/.test(designer.name) ||
            /^\s*$/.test(designer.email) ||
            /^\s*$/.test(designer.password)) {
            throw new errorHandle_1.AppError('all field are required', 400);
        }
        if (designer.password.length < 6) {
            throw new errorHandle_1.AppError('password must be at least 6 digits', 400);
        }
        console.log(designer, 'designer details');
        const createdDesigner = yield (0, addDesigner_1.addDesigner)(designerRepository)(designer);
        if (!createdDesigner) {
            res.status(500).json({ message: 'something went wrong' });
        }
        if (emailValidator.validate(designer.email)) {
            console.log(`${designer.email} is a valid email address.`);
            sendVerifyEmail(req.body.name, req.body.email, createdDesigner._id, createdDesigner.password);
        }
        else {
            console.log(`${designer.email} is not a valid email address.`);
        }
        res.status(200).json({ message: 'designer created successfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'somthing went wrong' });
    }
});
exports.designerRegister = designerRegister;
const sendVerifyEmail = (name, email, user_id, password) => __awaiter(void 0, void 0, void 0, function* () {
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
            subject: 'Verification Email',
            html: `<p>Hi ${name},This is Your password for enter to the StitchY App : ${password} <br>, please click <a href="http://localhost:3000/designer/verifyEmail/${user_id}">here</a> to verify your email.</p>`
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
        const designerId = req.params.id;
        console.log(designerId);
        const updateInfo = yield designerModel_1.designerModel.updateOne({ _id: designerId }, { $set: { isMailVerified: true } });
        if (updateInfo) {
            return res.json({ message: "email verified", updateInfo });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'internal server error' });
    }
});
exports.verifyEmail = verifyEmail;
