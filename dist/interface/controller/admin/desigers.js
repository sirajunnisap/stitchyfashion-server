"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDesigners = exports.blockDesigner = exports.getAllDesigners = void 0;
const designerModel_1 = require("../../../infra/database/model/designerModel");
const designerRepository_1 = __importDefault(require("../../../infra/repositories/designer/designerRepository"));
const errorHandle_1 = require("../../../utils/errorHandle");
const getDesigners_1 = require("../../../app/useCase/admin/getDesigners");
const db = designerModel_1.designerModel;
const designerRepository = (0, designerRepository_1.default)(db);
const getAllDesigners = async (req, res) => {
    try {
        const allDesigners = await (0, getDesigners_1.getDesigners)(designerRepository)();
        if (!allDesigners) {
            throw new errorHandle_1.AppError("something went wrong", 400);
        }
        res.status(200).json(allDesigners);
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
};
exports.getAllDesigners = getAllDesigners;
const blockDesigner = async (req, res) => {
    try {
        const { designerId, action } = req.body;
        console.log(designerId, action, "designer action");
        if (!designerId || !action)
            throw new errorHandle_1.AppError("not found", 404);
        const blockedDesigner = await (0, getDesigners_1.isBlockDesigner)(designerRepository)(designerId, action);
        if (blockedDesigner === null)
            throw new errorHandle_1.AppError("something went wrong while fetch the user", 500);
        if (blockedDesigner === true) {
            res.status(200).json({ message: "designer blocked successfully" });
            return;
        }
        else if (blockedDesigner === false) {
            res.status(200).json({ message: "designer unblocked successfully" });
            return;
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
};
exports.blockDesigner = blockDesigner;
const searchDesigners = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const sort = req.query.sort;
        let sortCriteria = {};
        if (sort === 'name-1')
            sortCriteria = { name: 1 };
        else if (sort === 'name1')
            sortCriteria = { name: -1 };
        else
            sortCriteria = {};
        const result = await (0, getDesigners_1.searchUsecase)(designerRepository)(searchQuery, sortCriteria);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
};
exports.searchDesigners = searchDesigners;
// export const getDesignerMoreInfo = async (req: Request, res: Response) => {
//     try {
//          const userId:any = req.params.id 
//          const result = await purchasedCoursesUse(paymentRepository)(userId)
//          res.status(200).json(result)
//          return
//     } catch (error) {
//     }
// }
