
import  express  from "express";
import { AllCourses, CourseDetails, addClasses, addCourse, courseUnlist, courseUpdate } from "../controller/course/addCourse";
import { designerLogin } from "../controller/designer/designerLogin";
import { designerProfile, profileUpdate } from "../controller/designer/designerData";
import { designerAuthenticateToken } from "../middleware/authMiddleware";
import { uploadImage } from "../controller/designer/uploadTutorials";
import { getAllCategories } from "../controller/course/getCategories";
import { verifyEmail } from "../controller/admin/addDesigner";
import { getPaymentedUsers, getPyUsrsforDashboard } from "../controller/course/payment";
import { getUserData, searchUsers } from "../controller/admin/getusers";

import { getMessageBychatId, sendMessageDsgr } from "../controller/chat/sendMessage";
import { accessChatController } from "../controller/chat/designerChat";



const designerRoute = express.Router()

designerRoute.post('/login',designerLogin);
designerRoute.patch('/verifyEmail/:id',verifyEmail);
designerRoute.get('/profile',designerAuthenticateToken,designerProfile);
designerRoute.put('/updateProfile',designerAuthenticateToken,profileUpdate);
designerRoute.get('/getCategories',getAllCategories)
designerRoute.post('/addCourse',designerAuthenticateToken,addCourse);
designerRoute.post('/addClass',addClasses);
designerRoute.get('/getCourses',designerAuthenticateToken,AllCourses);
designerRoute.get('/courseDetails/:id',CourseDetails);
designerRoute.put('/editCourse/:id',courseUpdate);
designerRoute.patch('/unlistCourse',courseUnlist);

designerRoute.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
      .then((url) => res.send(url))
      .catch((err) => res.status(500).send(err));
  });

designerRoute.get('/getPaymentedUsers/:id',getPaymentedUsers)
designerRoute.get('/paymentedUsersList/:id',getPaymentedUsers)
designerRoute.get('/users',searchUsers)
designerRoute.get('/getUserData/:id',getUserData)
designerRoute.post('/access-chat',designerAuthenticateToken,accessChatController)
designerRoute.get('/getMsgByChatId/:id',designerAuthenticateToken,getMessageBychatId)
designerRoute.post('/sendMessageDsgr',designerAuthenticateToken,sendMessageDsgr)
designerRoute.get('/getPaymentedUsers',designerAuthenticateToken,getPyUsrsforDashboard)

export default designerRoute