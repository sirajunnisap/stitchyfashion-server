import express  from "express";
import { adminLogin } from "../controller/admin/adminLoginController";
import { blockUser, getAllUsers } from "../controller/admin/getusers";
import { blockDesigner, getAllDesigners } from "../controller/admin/desigers";
import { adminProfile, profileUpdate } from "../controller/admin/adminData";
import { getAllCourses } from "../controller/course/getCourses";
import { adminAuthenticateToken } from "../middleware/authMiddleware";
import { designerRegister } from "../controller/admin/addDesigner";
import { addCategory, editCategory, getAllCategories } from "../controller/course/addCategory";
import { CourseDetails } from "../controller/course/CourseDetails";

const adminRoute = express.Router();

adminRoute.post('/login',adminLogin);
adminRoute.get('/dashboard',adminAuthenticateToken,)
adminRoute.get('/profile',adminAuthenticateToken,adminProfile)
adminRoute.put('/updateProfile',adminAuthenticateToken,profileUpdate)
adminRoute.get('/getUsers',getAllUsers);
adminRoute.patch('/block-user',blockUser);
adminRoute.get('/getDesigners',getAllDesigners)
adminRoute.patch('/block-designer',blockDesigner)
adminRoute.get('/getAllCourses',getAllCourses);
adminRoute.get('/courseDetails/:id',CourseDetails)
adminRoute.post('/addDesigner',designerRegister);
adminRoute.post('/addCategory',addCategory);
adminRoute.put('/editCategory/:id',editCategory);
adminRoute.get('/getCategories',getAllCategories);
// adminRoute.get('/getOneCategory',getOneCategory);


export default adminRoute ;