"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle_1 = require("../../../utils/errorHandle");
const courseRepositoryImp = (courseModel) => {
    const addCourse = async (course) => {
        // console.log(course,"course DAta in repositery");
        try {
            const addedCourse = await courseModel.create(course);
            // console.log('Added course:', addedCourse);
            return addedCourse;
        }
        catch (error) {
            console.error('Error adding course:', error);
            throw error;
        }
    };
    const addingClass = async (classData) => {
        const courseId = classData._id;
        // console.log(courseId,"courseid");
        const { title, description, video } = classData;
        const newClass = {
            title, description, video
        };
        // console.log(newClass,"new class");
        const findCourse = await courseModel.findById({ _id: courseId });
        if (!findCourse) {
            throw new errorHandle_1.AppError('error ', 404);
        }
        // console.log(findCourse,"findCourse by id ");
        findCourse.classes.push(newClass);
        const updateCourse = await findCourse.save();
        // console.log(updateCourse,"upadate adddddddddd class to course");
        return updateCourse;
    };
    const findCourseByTitle = async (title) => {
        const course = await courseModel.findOne({ title });
        return course;
    };
    const findClassByTitle = async (title) => {
        try {
            const course = await courseModel.findOne({
                "classes.title": title // Use $elemMatch to find a class with the specified title
            });
            if (course) {
                const foundClass = course.classes.find((cls) => cls.title === title);
                return foundClass || null;
            }
            return course;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    };
    const findCourseById = async (courseId) => {
        const course = await courseModel
            .findById(courseId)
            .populate("designer")
            .exec();
        // console.log(course,"course data in");
        return course;
    };
    const findOneCourse = async (courseId) => {
        const course = await courseModel.findById(courseId);
        // console.log(course,"course data in");
        return course;
    };
    const getAllCoursesById = async (designerId) => {
        const allCourses = await courseModel.find({ designer: designerId });
        if (!allCourses)
            throw new errorHandle_1.AppError('Somthing went wrong ', 500);
        if (allCourses.length === 0) {
            throw new errorHandle_1.AppError('No courses found for the designer', 404);
        }
        return allCourses;
    };
    const getAllCoursesByCategoryId = async (categoryId) => {
        const allCourses = await courseModel.find({ category: categoryId });
        if (!allCourses)
            throw new errorHandle_1.AppError('Somthing went wrong ', 500);
        if (allCourses.length === 0) {
            throw new errorHandle_1.AppError('No courses found for the designer', 404);
        }
        return allCourses;
    };
    const getAllCourses = async () => {
        const allCourses = await courseModel.find({});
        // console.log(allCourses,"courses list");
        return allCourses;
    };
    const updateCourseById = async (id, CourseDetails) => {
        const course = await courseModel.findByIdAndUpdate(id, CourseDetails, { new: true });
        return course;
    };
    const unlistCourse = async (id, action) => {
        let unlist;
        if (action === 'unlist')
            unlist = true;
        if (action === 'list')
            unlist = false;
        const unlistedCourse = await courseModel.findByIdAndUpdate(id, { unlist }, { new: true });
        if (!unlistedCourse)
            throw new errorHandle_1.AppError('something went wrong when unlist the course', 500);
        return unlist;
    };
    const searchCourse = async (searchQuery, sortCriteria) => {
        console.log(searchQuery, "search inputtttttttt");
        const searchresult = await courseModel.find({ title: { $regex: searchQuery, $options: 'i' } }).sort(sortCriteria);
        console.log(searchresult, "searchresult");
        return searchresult;
    };
    const getAllCoursesByCategory = async () => {
        const aggregationPipeline = [
            {
                $lookup: {
                    from: 'categories', // The name of the category collection in your database
                    localField: 'category', // The field in courseModel that links to the category
                    foreignField: '_id', // The field in categoryModel to link with
                    as: 'categoryData',
                },
            },
            {
                $unwind: '$categoryData', // Unwind the categoryData array created by $lookup
            },
            {
                $group: {
                    _id: '$categoryData.name', // Group by category name
                    categoryData: { $first: '$categoryData' }, // Include the category data
                    courses: { $push: '$$ROOT' }, // Push all course documents into the "courses" array
                },
            },
        ];
        const groupedCourses = await courseModel.aggregate(aggregationPipeline);
        console.log(groupedCourses, "group courses in category");
        return groupedCourses;
    };
    return { addCourse, findCourseById, getAllCoursesById, updateCourseById, unlistCourse, findCourseByTitle, getAllCourses, findOneCourse, addingClass, getAllCoursesByCategoryId, findClassByTitle, searchCourse, getAllCoursesByCategory };
};
exports.default = courseRepositoryImp;
