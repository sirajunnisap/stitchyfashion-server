"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getUserById = void 0;
const getUserById = (userRepository) => async (id) => {
    const user = await userRepository.getUserById(id);
    return user;
};
exports.getUserById = getUserById;
const updateProfile = (userRepository) => {
    return async (id, userDetails) => {
        const user = await userRepository.updateUserById(id, userDetails);
        return user;
    };
};
exports.updateProfile = updateProfile;
