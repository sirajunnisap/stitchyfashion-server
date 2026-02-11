"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getDesignerById = void 0;
const getDesignerById = (designerRepository) => async (id) => {
    const user = await designerRepository.getDesignerById(id);
    return user;
};
exports.getDesignerById = getDesignerById;
const updateProfile = (designerRepository) => {
    return async (id, userDetails) => {
        const user = await designerRepository.updateDesignerById(id, userDetails);
        return user;
    };
};
exports.updateProfile = updateProfile;
