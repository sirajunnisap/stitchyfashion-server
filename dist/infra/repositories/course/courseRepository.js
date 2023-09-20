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
const errorHandle_1 = require("../../../utils/errorHandle");
const courseRepositoryImp = (courseModel) => {
    const addCourse = (course) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(course, "course DAta in repositery");
        try {
            const addedCourse = yield courseModel.create(course);
            console.log('Added course:', addedCourse);
            return addedCourse;
        }
        catch (error) {
            console.error('Error adding course:', error);
            throw error;
        }
    });
    const addingClass = (classData) => __awaiter(void 0, void 0, void 0, function* () {
        const courseId = classData._id;
        console.log(courseId, "courseid");
        const { title, description, video } = classData;
        const newClass = {
            title, description, video
        };
        console.log(newClass, "new class");
        const findCourse = yield courseModel.findById({ _id: courseId });
        if (!findCourse) {
            throw new errorHandle_1.AppError('error ', 404);
        }
        console.log(findCourse, "findCourse by id ");
        findCourse.classes.push(newClass);
        const updateCourse = yield findCourse.save();
        console.log(updateCourse, "upadate adddddddddd class to course");
        return updateCourse;
    });
    const findCourseByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseModel.findOne({ title });
        return course;
    });
    const findClassByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield courseModel.findOne({
                "classes.title": title // Use $elemMatch to find a class with the specified title
            });
            if (course) {
                const foundClass = course.classes.find((cls) => cls.title === title);
                return foundClass || null;
            }
            return course;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
    const findCourseById = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseModel
            .findById(courseId)
            .populate("designer")
            .exec();
        console.log(course, "course data in");
        return course;
    });
    const findOneCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseModel.findById(courseId);
        console.log(course, "course data in");
        return course;
    });
    const getAllCoursesById = (designerId) => __awaiter(void 0, void 0, void 0, function* () {
        const allCourses = yield courseModel.find({ designer: designerId });
        if (!allCourses)
            throw new errorHandle_1.AppError('Somthing went wrong ', 500);
        if (allCourses.length === 0) {
            throw new errorHandle_1.AppError('No courses found for the designer', 404);
        }
        return allCourses;
    });
    const getAllCoursesByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
        const allCourses = yield courseModel.find({ category: categoryId });
        if (!allCourses)
            throw new errorHandle_1.AppError('Somthing went wrong ', 500);
        if (allCourses.length === 0) {
            throw new errorHandle_1.AppError('No courses found for the designer', 404);
        }
        return allCourses;
    });
    const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        const allCourses = yield courseModel.find({});
        console.log(allCourses, "courses list");
        return allCourses;
    });
    const updateCourseById = (id, CourseDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseModel.findByIdAndUpdate(id, CourseDetails, { new: true });
        return course;
    });
    const unlistCourse = (id, action) => __awaiter(void 0, void 0, void 0, function* () {
        let unlist;
        if (action === 'unlist')
            unlist = true;
        if (action === 'list')
            unlist = false;
        const unlistedCourse = yield courseModel.findByIdAndUpdate(id, { unlist }, { new: true });
        if (!unlistedCourse)
            throw new errorHandle_1.AppError('something went wrong when unlist the course', 500);
        return unlist;
    });
    return { addCourse, findCourseById, getAllCoursesById, updateCourseById, unlistCourse, findCourseByTitle, getAllCourses, findOneCourse, addingClass, getAllCoursesByCategoryId, findClassByTitle };
};
exports.default = courseRepositoryImp;
