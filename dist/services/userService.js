"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
// services/userService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//* Creates User In The Database
const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
};
exports.createUser = createUser;
