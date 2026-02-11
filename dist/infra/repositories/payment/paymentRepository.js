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
const paymentRepositoryImp = (paymentModel) => {
    const addPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(paymentData,"payment data for addddd pdb");
        try {
            console.log(paymentData, "selected course");
            let course = new paymentModel({
                amount: paymentData.amount,
                selectedCourse: paymentData.selectedCourse,
                user: paymentData.user,
                designer: paymentData.designer
            });
            const enrldCrse = yield course.save();
            const addedPayment = yield paymentModel.findOne({ _id: enrldCrse === null || enrldCrse === void 0 ? void 0 : enrldCrse._id }).populate('selectedCourse').populate('user').populate('designer');
            // console.log(addedPayment,"aadddddddd paymeeeeeeee");
            // console.log(enrldCrse,"cpirse payment ds fka;jf");
            // const enrldCrseData:any = await courseModel.findOne({_id:enrldCrse._id})
            // .populate('selectedCourse').populate('user')
            return addedPayment;
        }
        catch (error) {
            // console.error('Error adding course:', error);
            throw error;
        }
    });
    const findUsers = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(courseId,"course di for find usersssssssssss")
        try {
            const paymentWithUser = yield paymentModel.find({ selectedCourse: courseId }).populate('user').populate('selectedCourse');
            // console.log(paymentWithUser,"populated user form payment model lllllllllll");
            return paymentWithUser;
        }
        catch (error) {
        }
    });
    const findPurchasedCourse = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let paymentedCourses = yield paymentModel.find({ user: userId })
                .populate('user')
                .populate({
                path: 'selectedCourse',
                populate: {
                    path: 'designer',
                },
            });
            return paymentedCourses;
        }
        catch (error) {
        }
    });
    const getPaymentedUser = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const paymentedUser = yield paymentModel.findOne({ user: userId, selectedCourse: courseId });
            return paymentedUser;
        }
        catch (error) {
        }
    });
    const findPaymentedUsers = (designerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const paymentedUser = yield paymentModel.find({ designer: designerId });
            console.log(paymentedUser, "paymentedddddddd usersss");
            return paymentedUser;
        }
        catch (error) {
        }
    });
    return { addPayment, findUsers, findPurchasedCourse, getPaymentedUser, findPaymentedUsers };
};
exports.default = paymentRepositoryImp;
