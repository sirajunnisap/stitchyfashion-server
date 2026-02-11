"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const adminValidationHelper_1 = require("./adminValidationHelper");
const loginAdmin = (adminRepository) => {
    return async (admin) => {
        const { email, password } = admin;
        console.log(email, password, "admin emailpassword");
        const isadminExist = await adminRepository.findAdminbyEmail(email);
        if (!isadminExist) {
            throw new errorHandle_1.AppError("admin is not exist", 400);
        }
        console.log(isadminExist, "admindatafromisadminexist");
        if (isadminExist) {
            if (isadminExist.password !== password) {
                throw new errorHandle_1.AppError('incorrect password', 401);
            }
        }
        const adminToken = await (0, adminValidationHelper_1.createToken)(isadminExist);
        const verifiedAdmin = {
            token: adminToken,
            adminData: admin
        };
        return verifiedAdmin;
    };
};
exports.loginAdmin = loginAdmin;
