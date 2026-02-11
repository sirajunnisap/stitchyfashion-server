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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.designerRegister = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailValidator = __importStar(require("email-validator"));
const designerModel_1 = require("../../../infra/database/model/designerModel");
const designerRepository_1 = __importDefault(require("../../../infra/repositories/designer/designerRepository"));
const addDesigner_1 = require("../../../app/useCase/admin/addDesigner");
const db = designerModel_1.designerModel; //Instantiate MongoDB connection
const designerRepository = (0, designerRepository_1.default)(db);
const designerRegister = async (req, res) => {
    try {
        const designer = req.body;
        // console.log(designer,"designer data for adding");
        // if(!designer.name || !designer.email ||
        //     /^\s*$/.test(designer.name)|| 
        //     /^\s*$/.test(designer.email)){
        //         throw new AppError('all field are required',400)
        //     }
        let password = Math.random().toString().substr(-10);
        console.log(password);
        const createdDesigner = await (0, addDesigner_1.addDesigner)(designerRepository)(designer);
        // console.log(createdDesigner,"designer creted");
        if (!createdDesigner) {
            res.status(500).json({ message: 'something went wrong' });
        }
        const designerEmail = createdDesigner.email;
        // console.log(designerEmail,"designer email for creating password");
        const addPassword = await designerModel_1.designerModel.findOneAndUpdate({ email: designerEmail }, { $set: { password: password } }, { new: true });
        // console.log(addPassword,"password add to the designer data");
        if (emailValidator.validate(designer.email)) {
            // console.log(`${designer.email} is a valid email address.`);
            if (addPassword && addPassword.password) {
                sendVerifyEmail(req.body.name, req.body.email, createdDesigner._id, addPassword.password);
            }
            else {
                console.log('Password not found in addPassword');
            }
        }
        else {
            console.log(`${designer.email} is not a valid email address.`);
        }
        res.status(200).json({ message: 'designer created successfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'somthing went wrong' });
    }
};
exports.designerRegister = designerRegister;
const sendVerifyEmail = async (name, email, user_id, password) => {
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
        const info = await transporter.sendMail(mailOptions);
        console.log("Email has been sent:", info.response);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
const verifyEmail = async (req, res) => {
    try {
        const designerId = req.params.id;
        console.log(designerId);
        const updateInfo = await designerModel_1.designerModel.updateOne({ _id: designerId }, { $set: { isMailVerified: true } });
        if (updateInfo) {
            return res.json({ message: "email verified", updateInfo });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'internal server error' });
    }
};
exports.verifyEmail = verifyEmail;
