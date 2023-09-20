"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(mssg, statusCode) {
        super(mssg);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
