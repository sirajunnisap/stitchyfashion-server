"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentedUsersforDash = exports.getpaymentUserUser = exports.purchasedCoursesUse = exports.getUsersfromPymt = exports.addPaymentUse = void 0;
const addPaymentUse = (paymentRepository) => {
    return async (paymentData) => {
        const addedPayment = await paymentRepository.addPayment(paymentData);
        return addedPayment;
    };
};
exports.addPaymentUse = addPaymentUse;
const getUsersfromPymt = (paymentRepository) => {
    return async (courseId) => {
        const usersList = await paymentRepository.findUsers(courseId);
        return usersList;
    };
};
exports.getUsersfromPymt = getUsersfromPymt;
const purchasedCoursesUse = (paymentRepository) => {
    return async (userId) => {
        const purchaseCourses = await paymentRepository.findPurchasedCourse(userId);
        console.log(purchaseCourses, "purchased courseeee");
        return purchaseCourses;
    };
};
exports.purchasedCoursesUse = purchasedCoursesUse;
const getpaymentUserUser = (paymentRepository) => {
    return async (userId, courseId) => {
        const paymentedUser = await paymentRepository.getPaymentedUser(userId, courseId);
        return paymentedUser;
    };
};
exports.getpaymentUserUser = getpaymentUserUser;
const getPaymentedUsersforDash = (paymentRepository) => {
    return async (designerId) => {
        const paymentedUsers = await paymentRepository.findPaymentedUsers(designerId);
        return paymentedUsers;
    };
};
exports.getPaymentedUsersforDash = getPaymentedUsersforDash;
