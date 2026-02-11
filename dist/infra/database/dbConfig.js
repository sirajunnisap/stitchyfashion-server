"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async (connectionUrl) => {
    try {
        await mongoose_1.default.connect(connectionUrl);
        console.log('mongoDB connected!');
    }
    catch (error) {
        throw new Error('failed to connect to mongodb');
    }
};
exports.default = connectDB;
