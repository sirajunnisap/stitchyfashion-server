"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paymentRepositoryImp = (paymentModel) => {
    const addPayment = async (paymentData) => {
        // console.log(paymentData,"payment data for addddd pdb");
        try {
            console.log(paymentData, "selected course");
            let course = new paymentModel({
                amount: paymentData.amount,
                selectedCourse: paymentData.selectedCourse,
                user: paymentData.user,
                designer: paymentData.designer
            });
            const enrldCrse = await course.save();
            const addedPayment = await paymentModel.findOne({ _id: enrldCrse === null || enrldCrse === void 0 ? void 0 : enrldCrse._id }).populate('selectedCourse').populate('user').populate('designer');
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
    };
    const findUsers = async (courseId) => {
        // console.log(courseId,"course di for find usersssssssssss")
        try {
            const paymentWithUser = await paymentModel.find({ selectedCourse: courseId }).populate('user').populate('selectedCourse');
            // console.log(paymentWithUser,"populated user form payment model lllllllllll");
            return paymentWithUser;
        }
        catch (error) {
        }
    };
    const findPurchasedCourse = async (userId) => {
        try {
            let paymentedCourses = await paymentModel.find({ user: userId })
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
    };
    const getPaymentedUser = async (userId, courseId) => {
        try {
            const paymentedUser = await paymentModel.findOne({ user: userId, selectedCourse: courseId });
            return paymentedUser;
        }
        catch (error) {
        }
    };
    const findPaymentedUsers = async (designerId) => {
        try {
            const paymentedUser = await paymentModel.find({ designer: designerId });
            console.log(paymentedUser, "paymentedddddddd usersss");
            return paymentedUser;
        }
        catch (error) {
        }
    };
    return { addPayment, findUsers, findPurchasedCourse, getPaymentedUser, findPaymentedUsers };
};
exports.default = paymentRepositoryImp;
