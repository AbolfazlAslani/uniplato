// services/userService.ts
import { PrismaClient } from '@prisma/client';

interface CreateUserInput {
  name: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const prisma = new PrismaClient();

//* Creates User In The Database
export const createUser = async (userData: CreateUserInput) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};
