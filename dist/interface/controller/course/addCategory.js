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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.addCategory = void 0;
const categoryModel_1 = require("../../../infra/database/model/categoryModel");
const addCategory_1 = require("../../../app/useCase/admin/addCategory");
const errorHandle_1 = require("../../../utils/errorHandle");
const categoryRepository_1 = __importDefault(require("../../../infra/repositories/course/categoryRepository"));
const db = categoryModel_1.categoryModel;
const categoryRepository = (0, categoryRepository_1.default)(db);
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CategoryData = req.body;
        console.log(CategoryData, "category data for add");
        const addedCategory = yield (0, addCategory_1.categoryAdding)(categoryRepository)(CategoryData);
        if (!addedCategory) {
            res.status(500).json({ message: "something went wrong" });
        }
        res.status(200).json({ message: "Category created successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "somthing went wrong" });
    }
});
exports.addCategory = addCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield (0, addCategory_1.getCategories)(categoryRepository)();
        if (!allCategories) {
            throw new errorHandle_1.AppError("something went wrong", 400);
        }
        res.status(200).json(allCategories);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getAllCategories = getAllCategories;
