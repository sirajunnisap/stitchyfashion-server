"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminModel_1 = require("../../database/model/adminModel");
const adminRepositoryImp = (AdminModel) => {
    const findAdminbyEmail = async (email) => {
        const admindetails = await AdminModel.find();
        console.log(admindetails, "adminlist");
        const admin = await AdminModel.findOne({ email });
        console.log(admin, 'admin details');
        return admin;
    };
    const getAdminById = async (adminId) => {
        try {
            const admin = await adminModel_1.adminModel.findById(adminId, { password: 0 });
            if (!admin) {
                return null;
            }
            return admin;
        }
        catch (error) {
            throw error;
        }
    };
    const updateAdminById = async (id, adminDetails) => {
        console.log(adminDetails, "adminDetails for update");
        console.log(id, "id for admin update");
        const updatedAdmin = await adminModel_1.adminModel.findByIdAndUpdate(id, adminDetails, { new: true });
        console.log(updatedAdmin, "updatedAdmin");
        return updatedAdmin;
    };
    return { findAdminbyEmail, getAdminById, updateAdminById };
};
exports.default = adminRepositoryImp;
