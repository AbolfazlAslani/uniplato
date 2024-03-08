// services/userService.ts
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
const prisma = new PrismaClient();
//* Creates User In The Database
export const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
};
//* Finds User By Email
export const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    return user;
};
//* Verify User Password 
export const verifyPassword = async (providedPassword, hashedPassword) => {
    try {
        const match = await compare(providedPassword, hashedPassword);
        return match;
    }
    catch (error) {
        console.error('Error verifying password:', error);
        throw new Error('Error verifying password');
    }
};