"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.designerAuthenticateToken = exports.adminAuthenticateToken = exports.userAuthenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.user;
        // console.log(authHeader,'auth headder');
        const secretKey = process.env.JWT_SECRET_KEY;
        // console.log(authHeader,"asdfghjk");
        if (!authHeader || !secretKey) {
            return res.send(401).json({ success: false, message: 'not authenticated', Auth: false });
        }
        const token = authHeader.split(' ')[1];
        // console.log(token,"1234567890");
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'invalid token', Auth: false });
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.userAuthenticateToken = userAuthenticateToken;
const adminAuthenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.admin;
        const secretKey = process.env.JWT_SECRET_KEY_ADMIN;
        // console.log(secretKey);
        // console.log(authHeader,"authheader admin");
        if (!authHeader || !secretKey) {
            return res.send(401).json({ success: false, message: 'not authenticated', Auth: false });
        }
        const token = authHeader.split(' ')[1];
        // console.log(token,"token from authheader spliting admin");
        jsonwebtoken_1.default.verify(token, secretKey, (err, admin) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = admin;
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.adminAuthenticateToken = adminAuthenticateToken;
const designerAuthenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.designer;
        const secretKey = process.env.JWT_SECRET_KEY_DESIGNER;
        // console.log(authHeader,"auth header");
        if (!authHeader || !secretKey) {
            return res.send(401).json({ success: false, message: 'not authenticated', Auth: false });
        }
        const token = authHeader.split(' ')[1];
        // console.log(token , "token ");
        jsonwebtoken_1.default.verify(token, secretKey, (err, designer) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = designer;
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.designerAuthenticateToken = designerAuthenticateToken;
