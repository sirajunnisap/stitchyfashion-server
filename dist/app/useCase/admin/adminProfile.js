"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.AdminById = void 0;
const AdminById = (adminRepository) => async (id) => {
    const user = await adminRepository.getAdminById(id);
    return user;
};
exports.AdminById = AdminById;
const updateProfile = (adminRepository) => {
    return async (id, adminData) => {
        console.log(adminData, "adminData");
        try {
            const updatedAdmin = await adminRepository.updateAdminById(id, adminData);
            console.log(updatedAdmin, "updatedAdmin");
            return updatedAdmin;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
};
exports.updateProfile = updateProfile;
