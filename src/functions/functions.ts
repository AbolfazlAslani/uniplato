// functions.ts

import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// Hash the password
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

// Verify user password
export const verifyPassword = async (providedPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    const match = await compare(providedPassword, hashedPassword);
    return Promise.resolve(match); // Resolve the Promise with the boolean value
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Error verifying password');
  }
};


// Sign JWT
export const signJwt = async (payload: number): Promise<string> => {
    const jwtSecret: any = process.env.JWT_KEY;
    const token = sign({ payload }, jwtSecret, { expiresIn: '3d' });
    return token;
};
