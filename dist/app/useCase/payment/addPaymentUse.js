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
exports.getPaymentedUsersforDash = exports.getpaymentUserUser = exports.purchasedCoursesUse = exports.getUsersfromPymt = exports.addPaymentUse = void 0;
const addPaymentUse = (paymentRepository) => {
    return (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
        const addedPayment = yield paymentRepository.addPayment(paymentData);
        return addedPayment;
    });
};
exports.addPaymentUse = addPaymentUse;
const getUsersfromPymt = (paymentRepository) => {
    return (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const usersList = yield paymentRepository.findUsers(courseId);
        return usersList;
    });
};
exports.getUsersfromPymt = getUsersfromPymt;
const purchasedCoursesUse = (paymentRepository) => {
    return (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const purchaseCourses = yield paymentRepository.findPurchasedCourse(userId);
        console.log(purchaseCourses, "purchased courseeee");
        return purchaseCourses;
    });
};
exports.purchasedCoursesUse = purchasedCoursesUse;
const getpaymentUserUser = (paymentRepository) => {
    return (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentedUser = yield paymentRepository.getPaymentedUser(userId, courseId);
        return paymentedUser;
    });
};
exports.getpaymentUserUser = getpaymentUserUser;
const getPaymentedUsersforDash = (paymentRepository) => {
    return (designerId) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentedUsers = yield paymentRepository.findPaymentedUsers(designerId);
        return paymentedUsers;
    });
};
exports.getPaymentedUsersforDash = getPaymentedUsersforDash;
