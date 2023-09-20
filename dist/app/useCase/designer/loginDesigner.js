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
exports.loginDesigner = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const designerValidationHelper_1 = require("./designerValidationHelper");
const loginDesigner = (designerRepository) => {
    return (designer) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = designer;
        console.log(email, password, "designeremailpassword");
        const isDesignerExist = yield designerRepository.findDesignerByEmail(email);
        console.log(isDesignerExist, "designer exist");
        if (!isDesignerExist) {
            throw new errorHandle_1.AppError("adminis not exist", 400);
        }
        const isBlockDesigner = yield designerRepository.findDesignerIsBlock(email);
        if (isBlockDesigner)
            throw new errorHandle_1.AppError("designer blocked by admin", 404);
        if (isDesignerExist) {
            if (isDesignerExist.password !== password) {
                throw new errorHandle_1.AppError('incorrenct password', 401);
            }
        }
        const designerToken = yield (0, designerValidationHelper_1.createToken)(isDesignerExist);
        const verifiedDesigner = {
            token: designerToken,
            designerData: designer
        };
        return verifiedDesigner;
    });
};
exports.loginDesigner = loginDesigner;
