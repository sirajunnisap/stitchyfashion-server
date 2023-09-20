import express from "express";
import {userSignup, verifyEmail} from "../controller/user/userSignUpController";
import {changePassword, forgetPassword, loginWithGoogle, userLogin, verifyOtp} from "../controller/user/userLoginController";
import { profileUpdate, userProfile } from "../controller/user/userDetails";
import {userAuthenticateToken} from "../middleware/authMiddleware";
import { CategoryDetails, CourseDetails, getAllCategories, getAllCourses } from "../controller/course/CourseDetails";
import { getDesigner } from "../controller/designer/designerData";


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
export default userRoute;
