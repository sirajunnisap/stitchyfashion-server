"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDesigner = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const designerValidationHelper_1 = require("./designerValidationHelper");
const loginDesigner = (designerRepository) => {
    return async (designer) => {
        const { email, password } = designer;
        // console.log(email,password,"designeremailpassword");
        const isDesignerExist = await designerRepository.findDesignerByEmail(email);
        // console.log(isDesignerExist,"designer exist");
        if (!isDesignerExist) {
            throw new errorHandle_1.AppError("adminis not exist", 400);
        }
        const isBlockDesigner = await designerRepository.findDesignerIsBlock(email);
        if (isBlockDesigner)
            throw new errorHandle_1.AppError("designer blocked by admin", 404);
        if (isDesignerExist) {
            if (isDesignerExist.password !== password) {
                throw new errorHandle_1.AppError('incorrenct password', 401);
            }
        }
        const designerToken = await (0, designerValidationHelper_1.createToken)(isDesignerExist);
        const verifiedDesigner = {
            token: designerToken,
            designerData: designer
        };
        return verifiedDesigner;
    };
};
exports.loginDesigner = loginDesigner;
