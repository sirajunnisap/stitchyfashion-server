"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verifyOtp = exports.forgetPassword = exports.loginWithGoogle = exports.userLogin = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const userLogin_1 = require("../../../app/useCase/user/userLogin");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const errorHandle_1 = require("../../../utils/errorHandle");
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const userLogin = async (req, res) => {
    try {
        const user = req.body;
        const { email, password } = user;
        if (!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)) {
            throw new errorHandle_1.AppError('All fields are required', 400);
        }
        const userToken = await (0, userLogin_1.loginUser)(userRepository)(user);
        // console.log(userToken,"userToken in contoller");
        res.status(200).json(userToken);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'something went wrong' });
    }
};
exports.userLogin = userLogin;
const loginWithGoogle = async (req, res) => {
    try {
        const user = req.body;
        // console.log(user,"user from body");
        // const {name,email,phone} = user
        const token = await (0, userLogin_1.loginGoogle)(userRepository)(user);
        // console.log(token,"token form google ");
        if (token) {
            // console.log("loginwithgooglesuccessfull");
        }
        res.status(200).json(token);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.loginWithGoogle = loginWithGoogle;
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        //    console.log(email,"email for changepassword");
        const user = await userModel_1.userModel.findOne({ email });
        // console.log(user,"user for changepassword");
        if (!user) {
            // console.log("user is not exist ");
            return res.status(404).json({ message: "user not found" });
        }
        if (user.isBlocked === true) {
            throw new errorHandle_1.AppError('your account is suspended', 404);
        }
        let otp = Math.random().toString().substr(-4);
        console.log(otp, "otp");
        sendVerifyEmail(user.email, "Stitchy mail password reset OTP :", otp);
        const addOtpToDb = await userModel_1.userModel.findOneAndUpdate({ email }, { $set: { otp: otp } }, { new: true });
        //    console.log(addOtpToDb,"addotp to database ");
        return res.status(200).json({ message: "an otp has been sent to your account please verify" });
    }
    catch (error) {
        res.status(500).json({ message: "verification faied" });
    }
};
exports.forgetPassword = forgetPassword;
const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        //   console.log(otp, "otp verification");
        const userOtp = await userModel_1.userModel.findOne({ otp });
        //   console.log(userOtp, "user find using otp");
        if (userOtp) {
            // console.log("User verified");
            const deleteOtp = await userModel_1.userModel.findOneAndUpdate({ otp }, { $set: { otp: '' } }, { new: true });
            // console.log("OTP deleted", deleteOtp);
            if (deleteOtp) {
                //   console.log(deleteOtp._id, "userId");
                return res.status(200).json({ userId: deleteOtp._id });
            }
            else {
                //   console.log("User not found for the provided OTP");
                return res.status(404).json({ message: "User not found for the provided OTP" });
            }
        }
        else {
            // console.log("Invalid OTP");
            return res.status(404).json({ message: "Invalid OTP" });
        }
    }
    catch (error) {
        //   console.error("Error:", error);
        res.status(500).json({ message: "Verification failed" });
    }
};
exports.verifyOtp = verifyOtp;
const changePassword = async (req, res) => {
    try {
        const { password, userId } = req.body;
        // console.log(password, userId, "new password and user id");
        // Find the user by their userId
        const findUserById = await userModel_1.userModel.findById(userId);
        // console.log(findUserById, "user for update password");
        if (!findUserById) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // console.log(hashedPassword, "hashed password for update");
        const updatedUser = await userModel_1.userModel.findOneAndUpdate({ _id: userId }, { $set: { password: hashedPassword } }, { new: true });
        // console.log(updatedUser, "updated user");
        return res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "verification failed" });
    }
};
exports.changePassword = changePassword;
const sendVerifyEmail = async (email, message, otp) => {
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
            html: `<p>Hi , ${message} <br/> ${otp}</p>`
        };
        const info = await transporter.sendMail(mailOptions);
        // console.log("Email has been sent:", info.response);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
