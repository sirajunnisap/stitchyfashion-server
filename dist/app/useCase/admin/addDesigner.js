"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDesigner = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const addDesigner = (designerRepository) => {
    return async (designer) => {
        const isDesignerExist = await designerRepository.findDesignerByEmail(designer.email);
        if (isDesignerExist) {
            throw new errorHandle_1.AppError('designer is already exist', 409);
        }
        const createdDesigner = await designerRepository.createDesigner(designer);
        console.log(createdDesigner, "creted designer");
        return createdDesigner;
    };
};
exports.addDesigner = addDesigner;
