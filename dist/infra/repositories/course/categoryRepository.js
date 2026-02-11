"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryRepositoryImp = (categoryModel) => {
    const addCategory = async (category) => {
        try {
            const addedCategory = await categoryModel.create(category);
            // console.log(addedCategory,"added category");
            return addedCategory;
        }
        catch (error) {
            console.error('Error adding course:', error);
            throw error;
        }
    };
    const findCategoryByName = async (name) => {
        // const title = name.toUpperCase()
        const category = await categoryModel.findOne({ name });
        return category;
    };
    const getAllCategories = async () => {
        const allCategories = await categoryModel.find({});
        return allCategories;
    };
    const findCategoryById = async (categoryId) => {
        const category = await categoryModel.findById(categoryId);
        return category;
    };
    const editCategory = async (id, categoryDetails) => {
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, categoryDetails, { new: true });
        return updatedCategory;
    };
    return { addCategory, findCategoryByName, getAllCategories, findCategoryById, editCategory };
};
exports.default = categoryRepositoryImp;
