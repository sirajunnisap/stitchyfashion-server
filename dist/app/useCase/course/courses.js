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
exports.getCourseforDashUse = exports.searchUsecase = exports.getCoursesByCategoryId = void 0;
const getCoursesByCategoryId = (courseRepository) => (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(categoryId,"useCasecategoryID");
    const courses = yield courseRepository.getAllCoursesByCategoryId(categoryId);
    return courses;
});
exports.getCoursesByCategoryId = getCoursesByCategoryId;
const searchUsecase = (courseRepository) => (searchQuery, sortCriteria) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseRepository.searchCourse(searchQuery, sortCriteria);
    return course;
});
exports.searchUsecase = searchUsecase;
const getCourseforDashUse = (courseRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseRepository.getAllCoursesByCategory();
    return course;
});
exports.getCourseforDashUse = getCourseforDashUse;
