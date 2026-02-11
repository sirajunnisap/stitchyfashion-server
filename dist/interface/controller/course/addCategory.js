"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.editCategory = exports.addCategory = void 0;
const categoryModel_1 = require("../../../infra/database/model/categoryModel");
const addCategory_1 = require("../../../app/useCase/admin/addCategory");
const errorHandle_1 = require("../../../utils/errorHandle");
const categoryRepository_1 = __importDefault(require("../../../infra/repositories/course/categoryRepository"));
const db = categoryModel_1.categoryModel;
const categoryRepository = (0, categoryRepository_1.default)(db);
const addCategory = async (req, res) => {
    try {
        const CategoryData = req.body;
        // console.log(CategoryData,"category data for add");
        const addedCategory = await (0, addCategory_1.categoryAdding)(categoryRepository)(CategoryData);
        if (!addedCategory) {
            res.status(500).json({ message: "something went wrong" });
        }
        res.status(200).json({ message: "Category created successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "somthing went wrong" });
    }
};
exports.addCategory = addCategory;
const editCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const data = req.body;
        const categoryData = {
            name: data.name,
            description: data.description,
            image: data.image
        };
        const updatedCategory = await (0, addCategory_1.categoryEditUse)(categoryRepository)(categoryId, categoryData);
        // console.log(updatedCategory);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.editCategory = editCategory;
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await (0, addCategory_1.getCategories)(categoryRepository)();
        if (!allCategories) {
            throw new errorHandle_1.AppError("something went wrong", 400);
        }
        res.status(200).json(allCategories);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
};
exports.getAllCategories = getAllCategories;
