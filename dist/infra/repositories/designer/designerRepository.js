"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle_1 = require("../../../utils/errorHandle");
const designerModel_1 = require("../../database/model/designerModel");
const designerRepositoryImp = (DesignerModel) => {
    const createDesigner = async (designer) => {
        // console.log(designer,"designer data in reposigoriy");
        let newDesigner = await designerModel_1.designerModel.create(designer);
        return newDesigner;
    };
    const findDesignerByEmail = async (email) => {
        const designerDetails = await DesignerModel.find();
        // console.log(designerDetails,"designerslist");
        const designer = await DesignerModel.findOne({ email });
        // console.log(designer,"designerDetails");
        return designer;
    };
    const getAllDesigners = async () => {
        const allDesigners = await designerModel_1.designerModel.find({});
        if (!allDesigners)
            throw new errorHandle_1.AppError('Somthing went wrong when block the designer', 500);
        return allDesigners;
    };
    const getDesignerById = async (designerId) => {
        try {
            const designer = await designerModel_1.designerModel.findById(designerId, { password: 0 });
            // console.log(designer,"designer in repository");
            if (!designer) {
                // console.log("designer not found");
                return null;
            }
            return designer;
        }
        catch (error) {
            throw new errorHandle_1.AppError('Somthing went wrong when block the designer', 500);
        }
    };
    const updateDesignerById = async (id, designerDetails) => {
        const designer = await designerModel_1.designerModel.findByIdAndUpdate(id, designerDetails, { new: true });
        return designer;
    };
    const updateIsBlock = async (id, action) => {
        let isBlocked;
        if (action === 'block')
            isBlocked = true;
        if (action === 'unblock')
            isBlocked = false;
        const blockedDesigner = await designerModel_1.designerModel.findByIdAndUpdate(id, { isBlocked }, { new: true });
        if (!blockedDesigner)
            throw new errorHandle_1.AppError('something went wrong when block the designer', 500);
        return isBlocked;
    };
    const findDesignerIsBlock = async (email) => {
        const designer = await designerModel_1.designerModel.findOne({ email, isBlocked: true });
        // console.log(designer,"blocked designer")
        if (designer) {
            return true;
        }
        else {
            return false;
        }
    };
    const searchDesigner = async (searchQuery, sortCriteria) => {
        const searchresult = await designerModel_1.designerModel.find({ name: { $regex: searchQuery, $options: 'i' } }, { password: 0 }).sort(sortCriteria);
        return searchresult;
    };
    return { createDesigner, findDesignerByEmail, getAllDesigners, getDesignerById, updateDesignerById, updateIsBlock, findDesignerIsBlock, searchDesigner };
};
exports.default = designerRepositoryImp;
