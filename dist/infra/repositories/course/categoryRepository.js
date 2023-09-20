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
const categoryRepositoryImp = (categoryModel) => {
    const addCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const addedCategory = yield categoryModel.create(category);
            console.log(addedCategory, "added category");
            return addedCategory;
        }
        catch (error) {
            console.error('Error adding course:', error);
            throw error;
        }
    });
    const findCategoryByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoryModel.findOne({ name });
        return category;
    });
    const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        const allCategories = yield categoryModel.find({});
        return allCategories;
    });
    const findCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoryModel.findById(categoryId);
        return category;
    });
    return { addCategory, findCategoryByName, getAllCategories, findCategoryById };
};
exports.default = categoryRepositoryImp;
