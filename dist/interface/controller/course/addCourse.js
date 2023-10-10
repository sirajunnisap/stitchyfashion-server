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
exports.courseUnlist = exports.courseUpdate = exports.AllCourses = exports.CourseDetails = exports.getAllClasses = exports.addClasses = exports.addCourse = void 0;
const addCourses_1 = require("../../../app/useCase/course/addCourses");
const courseModel_1 = require("../../../infra/database/model/courseModel");
const courseRepository_1 = __importDefault(require("../../../infra/repositories/course/courseRepository"));
const errorHandle_1 = require("../../../utils/errorHandle");
const categoryModel_1 = require("../../../infra/database/model/categoryModel");
const db = courseModel_1.courseModel;
const courseRepository = (0, courseRepository_1.default)(db);
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const designerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.designer._id;
        // console.log(designerId,"designerid");
        const { title, description, duration, category, level, courseFee } = req.body;
        // console.log(category,"categorydetail");
        const categoryObj = yield categoryModel_1.categoryModel.findOne({ name: category });
        const courseData = req.body;
        // console.log(courseData,"course data for add");
        courseData.designer = designerId;
        courseData.category = categoryObj;
        // console.log(courseData,"courseData for adding");
        const addedCourse = yield (0, addCourses_1.courseAdding)(courseRepository)(courseData);
        if (!addedCourse) {
            res.status(500).json({ message: "something went wrong" });
        }
        res.status(200).json({ message: "course created successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "somthing went wrong" });
    }
});
exports.addCourse = addCourse;
const addClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body,"body data");
        const classData = req.body;
        const addedClass = yield (0, addCourses_1.addClassUseCase)(courseRepository)(classData);
        if (!addedClass) {
            res.status(500).json({ message: "something went wrong" });
        }
        res.status(200).json({ message: "class added successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.addClasses = addClasses;
const getAllClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getAllClasses = getAllClasses;
const CourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const courseData = yield (0, addCourses_1.findOneById)(courseRepository)(courseId);
        // console.log(courseData,"courseDetails ");
        res.status(200).json(courseData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.CourseDetails = CourseDetails;
const AllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const designerId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.designer._id;
        const allCourses = yield (0, addCourses_1.getCoursesByDesignerId)(courseRepository)(designerId);
        if (!allCourses)
            throw new errorHandle_1.AppError("something went wrong", 400);
        res.status(200).json(allCourses);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.AllCourses = AllCourses;
const courseUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CourseData = req.body;
        const courseId = req.params.id;
        //   console.log(CourseData,courseId,"courseupdate datas");
        const courseData = {
            title: CourseData.title,
            description: CourseData.description,
            // designer: CourseData.designer as string,
            duration: CourseData.duration,
            level: CourseData.level,
            courseFee: CourseData.courseFee,
            image: CourseData.image,
            // unlist: CourseData.unlist as boolean,
            // classes: CourseData.classes as Array<{}>,
        };
        const updatedCourse = yield (0, addCourses_1.updateCourse)(courseRepository)(courseId, courseData);
        if (updatedCourse) {
            res.status(200).json(updatedCourse);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" });
    }
});
exports.courseUpdate = courseUpdate;
const courseUnlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.query.id;
        const action = req.query.action;
        if (!courseId || !action)
            throw new errorHandle_1.AppError("not found", 404);
        const unlistedCourse = yield (0, addCourses_1.CourseUnlist)(courseRepository)(courseId, action);
        if (unlistedCourse === null)
            throw new errorHandle_1.AppError("something went wrong while fetch the course", 500);
        if (unlistedCourse === true) {
            res.status(200).json({ message: "course unlisted successfully" });
            return;
        }
        else if (unlistedCourse === false) {
            res.status(200).json({ message: "course list successfully" });
            return;
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.courseUnlist = courseUnlist;
