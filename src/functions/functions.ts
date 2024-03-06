import bcrypt from 'bcrypt'


//? This function hashes the password
const hashPassword = async (password:string):Promise<string> =>{
    return bcrypt.hash(password,10)

}

export default hashPassword;