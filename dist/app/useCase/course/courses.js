"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseforDashUse = exports.searchUsecase = exports.getCoursesByCategoryId = void 0;
const getCoursesByCategoryId = (courseRepository) => async (categoryId) => {
    // console.log(categoryId,"useCasecategoryID");
    const courses = await courseRepository.getAllCoursesByCategoryId(categoryId);
    return courses;
};
exports.getCoursesByCategoryId = getCoursesByCategoryId;
const searchUsecase = (courseRepository) => async (searchQuery, sortCriteria) => {
    const course = await courseRepository.searchCourse(searchQuery, sortCriteria);
    return course;
};
exports.searchUsecase = searchUsecase;
const getCourseforDashUse = (courseRepository) => async () => {
    const course = await courseRepository.getAllCoursesByCategory();
    return course;
};
exports.getCourseforDashUse = getCourseforDashUse;
