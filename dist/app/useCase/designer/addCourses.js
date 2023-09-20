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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseUnlist = exports.updateCourse = exports.findOneById = exports.getCourseById = exports.getCourses = exports.getCoursesByDesignerId = exports.courseAdding = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const courseAdding = (courseRepository) => {
    return (course) => __awaiter(void 0, void 0, void 0, function* () {
        const isCourseExist = yield courseRepository.findCourseByTitle(course.title);
        if (isCourseExist) {
            throw new errorHandle_1.AppError('course is already Exist', 409);
        }
        else {
            const addedCourse = yield courseRepository.addCourse(course);
            return addedCourse;
        }
    });
};
exports.courseAdding = courseAdding;
const getCoursesByDesignerId = (courseRepository) => (designerId) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courseRepository.getAllCoursesById(designerId);
    return courses;
});
exports.getCoursesByDesignerId = getCoursesByDesignerId;
const getCourses = (courseRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courseRepository.getAllCourses();
    return courses;
});
exports.getCourses = getCourses;
const getCourseById = (courseRepository) => {
    return (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseRepository.findCourseById(courseId);
        return course;
    });
};
exports.getCourseById = getCourseById;
const findOneById = (courseRepository) => {
    return (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseRepository.findOneCourse(courseId);
        return course;
    });
};
exports.findOneById = findOneById;
const updateCourse = (courseRepository) => {
    return (courseId, courseDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseRepository.updateCourseById(courseId, courseDetails);
        return course;
    });
};
exports.updateCourse = updateCourse;
const CourseUnlist = (courseRepository) => {
    return (courseId, action) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseRepository.unlistCourse(courseId, action);
        return course;
    });
};
exports.CourseUnlist = CourseUnlist;
