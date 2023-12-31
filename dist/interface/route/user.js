"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSignUpController_1 = require("../controller/user/userSignUpController");
const userLoginController_1 = require("../controller/user/userLoginController");
const userDetails_1 = require("../controller/user/userDetails");
const authMiddleware_1 = require("../middleware/authMiddleware");
const CourseDetails_1 = require("../controller/course/CourseDetails");
const designerData_1 = require("../controller/designer/designerData");
const payment_1 = require("../controller/course/payment");
const sendMessage_1 = require("../controller/chat/sendMessage");
const userChat_1 = require("../controller/chat/userChat");
const getCourses_1 = require("../controller/course/getCourses");
const userRoute = express_1.default.Router();
userRoute.post('/signup', userSignUpController_1.userSignup);
userRoute.post('/login', userLoginController_1.userLogin);
userRoute.post('/forgetPassword', userLoginController_1.forgetPassword);
userRoute.post('/otpVerification', userLoginController_1.verifyOtp);
userRoute.post('/changePassword', userLoginController_1.changePassword);
userRoute.patch('/verifyEmail/:id', userSignUpController_1.verifyEmail);
userRoute.get('/profile', authMiddleware_1.userAuthenticateToken, userDetails_1.userProfile);
userRoute.put('/updateProfile', authMiddleware_1.userAuthenticateToken, userDetails_1.profileUpdate);
userRoute.post('/login-googleAuth', userLoginController_1.loginWithGoogle);
userRoute.get('/getCourses', CourseDetails_1.getAllCourses);
userRoute.get('/courseDetails/:id', CourseDetails_1.CourseDetails);
userRoute.get('/getCategories', CourseDetails_1.getAllCategories);
userRoute.get('/categoryDetails/:id', CourseDetails_1.CategoryDetails);
userRoute.get('/getDesignerById/:id', designerData_1.getDesigner);
userRoute.get('/getAllDesignerCourses/:id', getCourses_1.getDesignerCourses);
userRoute.get('/checkout/:id', payment_1.checkout);
userRoute.post('/paymentforCourse', authMiddleware_1.userAuthenticateToken, payment_1.paymentforCourse);
userRoute.get('/paymentedUser/:id', authMiddleware_1.userAuthenticateToken, payment_1.paymentUser);
userRoute.get('/getPurchasedCourses', authMiddleware_1.userAuthenticateToken, payment_1.getPurchasedCourses);
userRoute.post('/access-chat', authMiddleware_1.userAuthenticateToken, userChat_1.accessChatController);
userRoute.get('/user-chat/:id', userChat_1.fetchUserChatController);
userRoute.post('/sendMessage', authMiddleware_1.userAuthenticateToken, sendMessage_1.sendMessage);
userRoute.get('/getMsgByChatId/:chatId', authMiddleware_1.userAuthenticateToken, sendMessage_1.getMessageBychatId);
exports.default = userRoute;
