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
const designerModel_1 = require("../../database/model/designerModel");
const designerRepositoryImp = (DesignerModel) => {
    const createDesigner = (designer) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(designer);
        let newDesigner = yield designerModel_1.designerModel.create(designer);
        return newDesigner;
    });
    const findDesignerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const designerDetails = yield DesignerModel.find();
        console.log(designerDetails, "designerslist");
        const designer = yield DesignerModel.findOne({ email });
        console.log(designer, "designerDetails");
        return designer;
    });
    const getAllDesigners = () => __awaiter(void 0, void 0, void 0, function* () {
        const allDesigners = yield designerModel_1.designerModel.find({});
        if (!allDesigners)
            throw new errorHandle_1.AppError('Somthing went wrong when block the designer', 500);
        return allDesigners;
    });
    const getDesignerById = (designerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const designer = yield designerModel_1.designerModel.findById(designerId, { password: 0 });
            console.log(designer, "designer in repository");
            if (!designer) {
                console.log("designer not found");
                return null;
            }
            return designer;
        }
        catch (error) {
            throw new errorHandle_1.AppError('Somthing went wrong when block the designer', 500);
        }
    });
    const updateDesignerById = (id, designerDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const designer = yield designerModel_1.designerModel.findByIdAndUpdate(id, designerDetails, { new: true });
        return designer;
    });
    const updateIsBlock = (id, action) => __awaiter(void 0, void 0, void 0, function* () {
        let isBlocked;
        if (action === 'block')
            isBlocked = true;
        if (action === 'unblock')
            isBlocked = false;
        const blockedDesigner = yield designerModel_1.designerModel.findByIdAndUpdate(id, { isBlocked }, { new: true });
        if (!blockedDesigner)
            throw new errorHandle_1.AppError('something went wrong when block the designer', 500);
        return isBlocked;
    });
    const findDesignerIsBlock = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const designer = yield designerModel_1.designerModel.findOne({ email, isBlocked: true });
        console.log(designer, "blocked designer");
        if (designer) {
            return true;
        }
        else {
            return false;
        }
    });
    return { createDesigner, findDesignerByEmail, getAllDesigners, getDesignerById, updateDesignerById, updateIsBlock, findDesignerIsBlock };
};
exports.default = designerRepositoryImp;
