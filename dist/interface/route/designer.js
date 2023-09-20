"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addCourse_1 = require("../controller/course/addCourse");
const designerLogin_1 = require("../controller/designer/designerLogin");
const designerData_1 = require("../controller/designer/designerData");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadTutorials_1 = require("../controller/designer/uploadTutorials");
const getCategories_1 = require("../controller/course/getCategories");
const addDesigner_1 = require("../controller/admin/addDesigner");
const designerRoute = express_1.default.Router();
designerRoute.post('/login', designerLogin_1.designerLogin);
designerRoute.patch('/verifyEmail/:id', addDesigner_1.verifyEmail);
designerRoute.get('/profile', authMiddleware_1.designerAuthenticateToken, designerData_1.designerProfile);
designerRoute.put('/updateProfile', authMiddleware_1.designerAuthenticateToken, designerData_1.profileUpdate);
designerRoute.get('/getCategories', getCategories_1.getAllCategories);
designerRoute.post('/addCourse', authMiddleware_1.designerAuthenticateToken, addCourse_1.addCourse);
designerRoute.post('/addClass', addCourse_1.addClasses);
designerRoute.get('/getCourses', authMiddleware_1.designerAuthenticateToken, addCourse_1.AllCourses);
designerRoute.get('/courseDetails/:id', addCourse_1.CourseDetails);
designerRoute.put('/editCourse/:id', addCourse_1.courseUpdate);
designerRoute.patch('/unlistCourse', addCourse_1.courseUnlist);
designerRoute.post("/uploadImage", (req, res) => {
    (0, uploadTutorials_1.uploadImage)(req.body.image)
        .then((url) => res.send(url))
        .catch((err) => res.status(500).send(err));
});
exports.default = designerRoute;
