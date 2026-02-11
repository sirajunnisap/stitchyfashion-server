"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const categoryModel_1 = require("../../../infra/database/model/categoryModel");
const errorHandle_1 = require("../../../utils/errorHandle");
const categoryRepository_1 = __importDefault(require("../../../infra/repositories/course/categoryRepository"));
const addCategory_1 = require("../../../app/useCase/admin/addCategory");
const db = categoryModel_1.categoryModel;
const categoryRepository = (0, categoryRepository_1.default)(db);
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
