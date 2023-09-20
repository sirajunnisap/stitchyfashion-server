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
exports.addDesigner = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const addDesigner = (designerRepository) => {
    return (designer) => __awaiter(void 0, void 0, void 0, function* () {
        const isDesignerExist = yield designerRepository.findDesignerByEmail(designer.email);
        if (isDesignerExist) {
            throw new errorHandle_1.AppError('designer is already exist', 409);
        }
        const createdDesigner = yield designerRepository.createDesigner(designer);
        return createdDesigner;
    });
};
exports.addDesigner = addDesigner;
