"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsecase = exports.isBlockDesigner = exports.getDesignerById = exports.getDesigners = void 0;
const getDesigners = (designerRepository) => async () => {
    const designers = await designerRepository.getAllDesigners();
    return designers;
};
exports.getDesigners = getDesigners;
const getDesignerById = (designerRepository) => {
    return async (designerId) => {
        const designer = await designerRepository.getDesignerById(designerId);
        return designer;
    };
};
exports.getDesignerById = getDesignerById;
const isBlockDesigner = (designerRepository) => {
    return async (designerId, action) => {
        console.log(designerId, action);
        const blockedDesigner = await designerRepository.updateIsBlock(designerId, action);
        return blockedDesigner;
    };
};
exports.isBlockDesigner = isBlockDesigner;
const searchUsecase = (designerRepository) => async (searchQuery, sortCriteria) => {
    const designer = await designerRepository.searchDesigner(searchQuery, sortCriteria);
    return designer;
};
exports.searchUsecase = searchUsecase;
