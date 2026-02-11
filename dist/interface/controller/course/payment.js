"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMoreInfo = exports.getPyUsrsforDashboard = exports.getPurchasedCourses = exports.getPaymentedUsers = exports.paymentUser = exports.paymentforCourse = exports.checkout = void 0;
const courseModel_1 = require("../../../infra/database/model/courseModel");
const courseRepository_1 = __importDefault(require("../../../infra/repositories/course/courseRepository"));
const addCourses_1 = require("../../../app/useCase/course/addCourses");
const paymentModel_1 = require("../../../infra/database/model/paymentModel");
const userModel_1 = require("../../../infra/database/model/userModel");
const paymentRepository_1 = __importDefault(require("../../../infra/repositories/payment/paymentRepository"));
const addPaymentUse_1 = require("../../../app/useCase/payment/addPaymentUse");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const db = courseModel_1.courseModel;
const courseRepository = (0, courseRepository_1.default)(db);
const paymentdb = paymentModel_1.paymentModel;
const paymentRepository = (0, paymentRepository_1.default)(paymentdb);
const userdb = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(userdb);
const checkout = async (req, res) => {
    try {
        const courseid = req.params.id;
        const course = await (0, addCourses_1.findOneById)(courseRepository)(courseid);
        // console.log(course,"coursedeatils by id");
        res.status(200).json(course);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
exports.checkout = checkout;
const paymentforCourse = async (req, res) => {
    var _a;
    try {
        const paymentData = req.body;
        console.log(paymentData, "body data aaaaaaaaaaaa");
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
        // paymentData.course = courseId
        paymentData.user = userId;
        const addedPayment = await (0, addPaymentUse_1.addPaymentUse)(paymentRepository)(paymentData);
        console.log(addedPayment, "addedpapypemnt");
        res.status(200).json(addedPayment);
        return;
    }
    catch (error) {
    }
};
exports.paymentforCourse = paymentforCourse;
const paymentUser = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
        const courseId = req.params.id;
        // console.log(courseId);
        // console.log(findUser,"user find for payment ed user user id ");
        const paymented = await (0, addPaymentUse_1.getpaymentUserUser)(paymentRepository)(userId, courseId);
        // paymentModel.findOne({ user: userId, selectedCourse: courseId })
        // console.log(paymented,"payment duser find ");
        res.status(200).json(paymented);
    }
    catch (error) {
    }
};
exports.paymentUser = paymentUser;
const getPaymentedUsers = async (req, res) => {
    try {
        const courseId = req.params.id;
        // console.log(courseId,"course idddddddddddddd");
        // const userinpayment = await paymentModel.findOne({ course: courseId }).populate('user').exec();
        const users = await (0, addPaymentUse_1.getUsersfromPymt)(paymentRepository)(courseId);
        //    console.log(users,"user for show ing designer ");
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getPaymentedUsers = getPaymentedUsers;
const getPurchasedCourses = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
        // console.log(userId,"useriddddddddddddddd");
        const courses = await (0, addPaymentUse_1.purchasedCoursesUse)(paymentRepository)(userId);
        //  paymentModel.find({user:userId}).populate('selectedCourse')
        // console.log(courses,"course find by id for showing purchased course in profile");
        res.status(200).json(courses);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getPurchasedCourses = getPurchasedCourses;
const getPyUsrsforDashboard = async (req, res) => {
    var _a;
    try {
        const designerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.designer._id;
        const result = await (0, addPaymentUse_1.getPaymentedUsersforDash)(paymentRepository)(designerId);
        res.status(200).json(result);
    }
    catch (error) {
    }
};
exports.getPyUsrsforDashboard = getPyUsrsforDashboard;
const getUserMoreInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await (0, addPaymentUse_1.purchasedCoursesUse)(paymentRepository)(userId);
        res.status(200).json(result);
        return;
    }
    catch (error) {
    }
};
exports.getUserMoreInfo = getUserMoreInfo;
