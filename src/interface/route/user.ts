import express from "express";
import {userSignup, verifyEmail} from "../controller/user/userSignUpController";
import {changePassword, forgetPassword, loginWithGoogle, userLogin, verifyOtp} from "../controller/user/userLoginController";
import { profileUpdate, userProfile } from "../controller/user/userDetails";
import {userAuthenticateToken} from "../middleware/authMiddleware";
import { CategoryDetails, CourseDetails, getAllCategories, getAllCourses } from "../controller/course/CourseDetails";
import { getDesigner } from "../controller/designer/designerData";
import { checkout, getPurchasedCourses, paymentUser, paymentforCourse } from "../controller/course/payment";
import { getMessageBychatId, sendMessage } from "../controller/chat/sendMessage";
import { accessChatController, fetchUserChatController } from "../controller/chat/userChat";
import { getDesignerCourses } from "../controller/course/getCourses";

const userRoute = express.Router();

userRoute.post('/signup',userSignup);
userRoute.post('/login',userLogin);
userRoute.post('/forgetPassword',forgetPassword)
userRoute.post('/otpVerification',verifyOtp)
userRoute.post('/changePassword',changePassword)
userRoute.patch('/verifyEmail/:id',verifyEmail);
userRoute.get('/profile',userAuthenticateToken,userProfile);
userRoute.put('/updateProfile',userAuthenticateToken,profileUpdate);
userRoute.post('/login-googleAuth',loginWithGoogle)
userRoute.get('/getCourses',getAllCourses)
userRoute.get('/courseDetails/:id',CourseDetails)
userRoute.get('/getCategories',getAllCategories)
userRoute.get('/categoryDetails/:id',CategoryDetails)
userRoute.get('/getDesignerById/:id',getDesigner)
userRoute.get('/getAllDesignerCourses/:id',getDesignerCourses)
userRoute.get('/checkout/:id',checkout)
userRoute.post('/paymentforCourse',userAuthenticateToken,paymentforCourse)
userRoute.get('/paymentedUser/:id',userAuthenticateToken,paymentUser)
userRoute.get('/getPurchasedCourses',userAuthenticateToken,getPurchasedCourses)

userRoute.post('/access-chat',userAuthenticateToken,accessChatController)
userRoute.get('/user-chat/:id',fetchUserChatController)


userRoute.post('/sendMessage',userAuthenticateToken,sendMessage)
userRoute.get('/getMsgByChatId/:chatId', userAuthenticateToken, getMessageBychatId);


export default userRoute;
