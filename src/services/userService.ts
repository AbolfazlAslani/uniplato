// services/userService.ts
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { hashPassword } from '../utils/functions';
//* User Type
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

//* Finds User By Email
export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

//* Get User By Email And Password
export const getUserByEmailAndPassword = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await verifyPassword(password, user.password))) {
    return user;
  }

  return null;
};


//* Verify User Password 
export const verifyPassword = async (providedPassword: string,hashedPassword:string): Promise<boolean> => {
  try {
    const match = await compare(providedPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Error verifying password');
  }
};
