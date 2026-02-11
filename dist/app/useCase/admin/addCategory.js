"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.categoryEditUse = exports.categoryAdding = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const categoryAdding = (categoryRepository) => {
    return async (category) => {
        const categoryname = category.name;
        const toupperName = categoryname.toUpperCase();
        category.name = toupperName;
        const isCategoryExist = await categoryRepository.findCategoryByName(category.name);
        console.log(isCategoryExist, "category exist");
        if (isCategoryExist) {
            throw new errorHandle_1.AppError('course is already Exist', 409);
        }
        console.log(category, "categoryitems");
        const addedCategory = await categoryRepository.addCategory(category);
        return addedCategory;
    };
};
exports.categoryAdding = categoryAdding;
const categoryEditUse = (categoryRepository) => {
    return async (id, categoryData) => {
        try {
            const updatedCategory = await categoryRepository.editCategory(id, categoryData);
            return updatedCategory;
        }
        catch (error) {
            throw error;
        }
    };
};
exports.categoryEditUse = categoryEditUse;
const getCategories = (categoryRepository) => async () => {
    const category = await categoryRepository.getAllCategories();
    return category;
};
exports.getCategories = getCategories;
