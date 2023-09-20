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
exports.loginAdmin = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const adminValidationHelper_1 = require("./adminValidationHelper");
const loginAdmin = (adminRepository) => {
    return (admin) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = admin;
        console.log(email, password, "admin emailpassword");
        const isadminExist = yield adminRepository.findAdminbyEmail(email);
        if (!isadminExist) {
            throw new errorHandle_1.AppError("admin is not exist", 400);
        }
        console.log(isadminExist, "admindatafromisadminexist");
        if (isadminExist) {
            if (isadminExist.password !== password) {
                throw new errorHandle_1.AppError('incorrect password', 401);
            }
        }
        const adminToken = yield (0, adminValidationHelper_1.createToken)(isadminExist);
        const verifiedAdmin = {
            token: adminToken,
            adminData: admin
        };
        return verifiedAdmin;
    });
};
exports.loginAdmin = loginAdmin;
