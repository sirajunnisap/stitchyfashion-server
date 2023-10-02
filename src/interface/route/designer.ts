
import  express  from "express";
import { AllCourses, CourseDetails, addClasses, addCourse, courseUnlist, courseUpdate } from "../controller/course/addCourse";
import { designerLogin } from "../controller/designer/designerLogin";
import { designerProfile, profileUpdate } from "../controller/designer/designerData";
import { designerAuthenticateToken } from "../middleware/authMiddleware";
import { uploadImage } from "../controller/designer/uploadTutorials";
import { getAllCategories } from "../controller/course/getCategories";
import { verifyEmail } from "../controller/admin/addDesigner";
import { getPaymentedUsers } from "../controller/course/payment";
import { searchUsers } from "../controller/admin/getusers";



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
export default designerRoute