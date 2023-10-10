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
exports.getCategories = exports.categoryEditUse = exports.categoryAdding = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const categoryAdding = (categoryRepository) => {
    return (category) => __awaiter(void 0, void 0, void 0, function* () {
        const categoryname = category.name;
        const toupperName = categoryname.toUpperCase();
        category.name = toupperName;
        const isCategoryExist = yield categoryRepository.findCategoryByName(category.name);
        console.log(isCategoryExist, "category exist");
        if (isCategoryExist) {
            throw new errorHandle_1.AppError('course is already Exist', 409);
        }
        console.log(category, "categoryitems");
        const addedCategory = yield categoryRepository.addCategory(category);
        return addedCategory;
    });
};
exports.categoryAdding = categoryAdding;
const categoryEditUse = (categoryRepository) => {
    return (id, categoryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedCategory = yield categoryRepository.editCategory(id, categoryData);
            return updatedCategory;
        }
        catch (error) {
            throw error;
        }
    });
};
exports.categoryEditUse = categoryEditUse;
const getCategories = (categoryRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryRepository.getAllCategories();
    return category;
});
exports.getCategories = getCategories;
