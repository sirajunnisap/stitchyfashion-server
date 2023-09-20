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
exports.isBlockDesigner = exports.getDesignerById = exports.getDesigners = void 0;
const getDesigners = (designerRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const designers = yield designerRepository.getAllDesigners();
    return designers;
});
exports.getDesigners = getDesigners;
const getDesignerById = (designerRepository) => {
    return (designerId) => __awaiter(void 0, void 0, void 0, function* () {
        const designer = yield designerRepository.getDesignerById(designerId);
        return designer;
    });
};
exports.getDesignerById = getDesignerById;
const isBlockDesigner = (designerRepository) => {
    return (designerId, action) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(designerId, action);
        const blockedDesigner = yield designerRepository.updateIsBlock(designerId, action);
        return blockedDesigner;
    });
};
exports.isBlockDesigner = isBlockDesigner;
