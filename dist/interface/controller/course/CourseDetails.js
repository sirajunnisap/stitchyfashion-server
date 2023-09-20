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
exports.CategoryDetails = exports.getAllCategories = exports.CourseDetails = exports.getAllCourses = void 0;
const addCourses_1 = require("../../../app/useCase/course/addCourses");
const courseModel_1 = require("../../../infra/database/model/courseModel");
const courseRepository_1 = __importDefault(require("../../../infra/repositories/course/courseRepository"));
const errorHandle_1 = require("../../../utils/errorHandle");
const categoryModel_1 = require("../../../infra/database/model/categoryModel");
const categoryRepository_1 = __importDefault(require("../../../infra/repositories/course/categoryRepository"));
const addCategory_1 = require("../../../app/useCase/admin/addCategory");
const courses_1 = require("../../../app/useCase/course/courses");
const db = courseModel_1.courseModel;
const courseRepository = (0, courseRepository_1.default)(db);
const dbcategory = categoryModel_1.categoryModel;
const categoryRepository = (0, categoryRepository_1.default)(dbcategory);
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCourses = yield (0, addCourses_1.getCourses)(courseRepository)();
        console.log(allCourses);
        if (!allCourses) {
            throw new errorHandle_1.AppError("something went wrong", 400);
        }
        res.status(200).json(allCourses);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getAllCourses = getAllCourses;
const CourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        console.log(courseId);
        const courseData = yield (0, addCourses_1.findOneById)(courseRepository)(courseId);
        console.log(courseData);
        res.status(200).json(courseData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.CourseDetails = CourseDetails;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield (0, addCategory_1.getCategories)(categoryRepository)();
        if (!allCategories) {
            throw new errorHandle_1.AppError("something went wrong", 400);
        }
        res.status(200).json(allCategories);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getAllCategories = getAllCategories;
const CategoryDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        console.log(categoryId, "categorid");
        const categoryData = yield (0, courses_1.getCoursesByCategoryId)(courseRepository)(categoryId);
        if (!categoryData)
            throw new errorHandle_1.AppError("something went wrong", 400);
        console.log(categoryData);
        res.status(200).json(categoryData);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.CategoryDetails = CategoryDetails;
