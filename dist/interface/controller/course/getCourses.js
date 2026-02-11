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
exports.searchCourses = exports.getDesignerCourses = exports.getAllCourses = void 0;
const addCourses_1 = require("../../../app/useCase/course/addCourses");
const courseModel_1 = require("../../../infra/database/model/courseModel");
const courseRepository_1 = __importDefault(require("../../../infra/repositories/course/courseRepository"));
const errorHandle_1 = require("../../../utils/errorHandle");
const courses_1 = require("../../../app/useCase/course/courses");
const db = courseModel_1.courseModel;
const courseRepository = (0, courseRepository_1.default)(db);
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCourses = yield (0, addCourses_1.getCourses)(courseRepository)();
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
const getDesignerCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const designerID = req.params.id;
        const courses = yield (0, addCourses_1.getCoursesByDesignerId)(courseRepository)(designerID);
        res.status(200).json(courses);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getDesignerCourses = getDesignerCourses;
const searchCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.q;
        console.log(searchQuery, "searching quey form frontend");
        const sort = req.query.sort;
        console.log(sort, "sorting data from frondent");
        let sortCriteria = {};
        if (sort === 'name-1')
            sortCriteria = { name: 1 };
        else if (sort === 'name1')
            sortCriteria = { name: -1 };
        else
            sortCriteria = {};
        console.log(sortCriteria, "sortcriteria");
        const result = yield (0, courses_1.searchUsecase)(courseRepository)(searchQuery, sortCriteria);
        console.log(result, "result");
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.searchCourses = searchCourses;
