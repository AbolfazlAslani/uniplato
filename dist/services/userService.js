"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.getUserByEmailAndPassword = exports.findUserByEmail = exports.createUser = void 0;
// services/userService.ts
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
//* Creates User In The Database
const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
};
exports.createUser = createUser;
//* Finds User By Email
const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    return user;
};
exports.findUserByEmail = findUserByEmail;
//* Get User By Email And Password
const getUserByEmailAndPassword = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (user && (await (0, exports.verifyPassword)(password, user.password))) {
        return user;
    }
    return null;
};
exports.getUserByEmailAndPassword = getUserByEmailAndPassword;
//* Verify User Password 
const verifyPassword = async (providedPassword, hashedPassword) => {
    try {
        const match = await (0, bcrypt_1.compare)(providedPassword, hashedPassword);
        return match;
    }
    catch (error) {
        console.error('Error verifying password:', error);
        throw new Error('Error verifying password');
    }
};
exports.verifyPassword = verifyPassword;
