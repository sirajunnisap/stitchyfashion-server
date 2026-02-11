"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseUnlist = exports.updateCourse = exports.findOneById = exports.getCourseById = exports.getCourses = exports.getCoursesByDesignerId = exports.addClassUseCase = exports.courseAdding = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const courseAdding = (courseRepository) => {
    return async (course) => {
        const isCourseExist = await courseRepository.findCourseByTitle(course.title);
        if (isCourseExist) {
            throw new errorHandle_1.AppError('course is already Exist', 409);
        }
        else {
            const addedCourse = await courseRepository.addCourse(course);
            return addedCourse;
        }
    };
};
exports.courseAdding = courseAdding;
const addClassUseCase = (courseRepository) => {
    return async (classes) => {
        const addClass = await courseRepository.addingClass(classes);
        return addClass;
    };
};
exports.addClassUseCase = addClassUseCase;
const getCoursesByDesignerId = (courseRepository) => async (designerId) => {
    const courses = await courseRepository.getAllCoursesById(designerId);
    return courses;
};
exports.getCoursesByDesignerId = getCoursesByDesignerId;
const getCourses = (courseRepository) => async () => {
    const courses = await courseRepository.getAllCourses();
    return courses;
};
exports.getCourses = getCourses;
const getCourseById = (courseRepository) => {
    return async (courseId) => {
        const course = await courseRepository.findCourseById(courseId);
        return course;
    };
};
exports.getCourseById = getCourseById;
const findOneById = (courseRepository) => {
    return async (courseId) => {
        const course = await courseRepository.findOneCourse(courseId);
        return course;
    };
};
exports.findOneById = findOneById;
const updateCourse = (courseRepository) => {
    return async (courseId, courseDetails) => {
        const course = await courseRepository.updateCourseById(courseId, courseDetails);
        return course;
    };
};
exports.updateCourse = updateCourse;
const CourseUnlist = (courseRepository) => {
    return async (courseId, action) => {
        const course = await courseRepository.unlistCourse(courseId, action);
        return course;
    };
};
exports.CourseUnlist = CourseUnlist;
