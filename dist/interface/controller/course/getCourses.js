"use strict";
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
const getAllCourses = async (req, res) => {
    try {
        const allCourses = await (0, addCourses_1.getCourses)(courseRepository)();
        if (!allCourses) {
            throw new errorHandle_1.AppError("something went wrong", 400);
        }
        res.status(200).json(allCourses);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
};
exports.getAllCourses = getAllCourses;
const getDesignerCourses = async (req, res) => {
    try {
        const designerID = req.params.id;
        const courses = await (0, addCourses_1.getCoursesByDesignerId)(courseRepository)(designerID);
        res.status(200).json(courses);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
};
exports.getDesignerCourses = getDesignerCourses;
const searchCourses = async (req, res) => {
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
        const result = await (0, courses_1.searchUsecase)(courseRepository)(searchQuery, sortCriteria);
        console.log(result, "result");
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
};
exports.searchCourses = searchCourses;
