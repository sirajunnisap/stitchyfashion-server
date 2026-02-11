"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDesigner = exports.profileUpdate = exports.designerProfile = void 0;
const designerModel_1 = require("../../../infra/database/model/designerModel");
const designerRepository_1 = __importDefault(require("../../../infra/repositories/designer/designerRepository"));
const designerDetails_1 = require("../../../app/useCase/designer/designerDetails");
const db = designerModel_1.designerModel;
const designerRepository = (0, designerRepository_1.default)(db);
const designerProfile = async (req, res) => {
    var _a;
    try {
        const designerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.designer._id;
        // console.log(designerId,"designerIdfor profile");
        const designerData = await (0, designerDetails_1.getDesignerById)(designerRepository)(designerId);
        // console.log(designerData,"designerData");
        res.status(200).json(designerData);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.designerProfile = designerProfile;
const profileUpdate = async (req, res) => {
    var _a;
    try {
        const designerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.designer._id;
        // console.log(designerId,"designerid for profileupdate");
        const data = req.body;
        // console.log(data,"designerdata for profile updation");
        const designerData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            image: data.image,
            field: data.field,
            aboutMe: data.aboutMe
        };
        // console.log(designerData,"designerdata");
        const updatedProfile = await (0, designerDetails_1.updateProfile)(designerRepository)(designerId, designerData);
        if (updatedProfile) {
            // console.log("designer data updated successfully",updatedProfile);
            res.status(200).json(updatedProfile);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
};
exports.profileUpdate = profileUpdate;
const getDesigner = async (req, res) => {
    try {
        const designerId = req.params.id;
        // console.log(designerId,"designeridforgetdata");
        const designer = await (0, designerDetails_1.getDesignerById)(designerRepository)(designerId);
        // console.log(designer,"designer data by designerid ");
        res.status(200).json(designer);
        return;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getDesigner = getDesigner;
