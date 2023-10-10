"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchasedCourses = exports.getPaymentedUsers = exports.paymentUser = exports.paymentforCourse = exports.checkout = void 0;
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
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseid = req.params.id;
        const course = yield (0, addCourses_1.findOneById)(courseRepository)(courseid);
        // console.log(course,"coursedeatils by id");
        res.status(200).json(course);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.checkout = checkout;
const paymentforCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const paymentData = req.body;
        // console.log(paymentData,"body data aaaaaaaaaaaa");
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
        // paymentData.course = courseId
        paymentData.user = userId;
        const addedPayment = yield (0, addPaymentUse_1.addPaymentUse)(paymentRepository)(paymentData);
        // console.log(addedPayment,"addedpapypemnt");
    }
    catch (error) {
    }
});
exports.paymentforCourse = paymentforCourse;
const paymentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.user._id;
        const courseId = req.params.id;
        // console.log(courseId);
        // console.log(findUser,"user find for payment ed user user id ");
        const paymented = yield (0, addPaymentUse_1.getpaymentUserUser)(paymentRepository)(userId, courseId);
        // paymentModel.findOne({ user: userId, selectedCourse: courseId })
        // console.log(paymented,"payment duser find ");
        res.status(200).json(paymented);
    }
    catch (error) {
    }
});
exports.paymentUser = paymentUser;
const getPaymentedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        // console.log(courseId,"course idddddddddddddd");
        // const userinpayment = await paymentModel.findOne({ course: courseId }).populate('user').exec();
        const users = yield (0, addPaymentUse_1.getUsersfromPymt)(paymentRepository)(courseId);
        //    console.log(users,"user for show ing designer ");
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPaymentedUsers = getPaymentedUsers;
const getPurchasedCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.user._id;
        // console.log(userId,"useriddddddddddddddd");
        const courses = yield (0, addPaymentUse_1.purchasedCoursesUse)(paymentRepository)(userId);
        //  paymentModel.find({user:userId}).populate('selectedCourse')
        // console.log(courses,"course find by id for showing purchased course in profile");
        res.status(200).json(courses);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPurchasedCourses = getPurchasedCourses;
