import bcrypt, { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';


//* This function hashes the password
const hashPassword = async (password:string):Promise<string> =>{
    return bcrypt.hash(password,10)

}

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
  
//* Sign JWT
export const signJwt = async(payload:number) =>{
    const jwtSecret:any = process.env.JWT_KEY;
    const token = sign({ payload }, jwtSecret, { expiresIn: '3d' });
    return token
}
  

export default hashPassword;