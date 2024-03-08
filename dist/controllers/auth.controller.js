import { createUser, findUserByEmail } from "../services/userService";
import hashPassword, { signJwt, verifyPassword } from "../functions/functions";
class AuthController {
    static async signUp(request, reply) {
        try {
            //? Catching Body
            const { name, lastname, phoneNumber, email, password } = request.body;
            //* Hashing password before adding to the database
            const hashedPassword = await hashPassword(password);
            //? Creating New User in database with Prisma
            const user = await createUser({ name, lastname, phoneNumber, email, password: hashedPassword });
            if (user) {
                reply.code(201).send({
                    success: true,
                    message: "Created Successfully!",
                    body: user
                });
            }
        }
        catch (error) {
            //? Handle duplicate email error
            if (error.code === 'P2002') {
                reply.code(400).send({
                    error: 'Email already taken'
                });
                //? Handle InternalServerError request
            }
            else {
                reply.code(500).send({ error: 'Internal Server Error' });
            }
        }
    }
    static async Login(request, reply) {
        try {
            const { email, password } = request.body;
            //* Checking if email exists
            const result = await findUserByEmail(email);
            if (result) {
                //?Verify Password
                const passwordVerification = await verifyPassword(password, result.password);
                if (passwordVerification) {
                    //* Sign JWT
                    const token = await signJwt(result.id);
                    reply.code(200).send({
                        success: true,
                        message: "Logged in Successfully!",
                        token
                    });
                }
                reply.code(401).send({ error: "Incorrect Email or Password" });
            }
            reply.code(401).send({ error: "Incorrect Email or Password" });
        }
        catch (error) {
            reply.code(500).send({ error: "Internal Server Error" });
        }
    }
}
export default AuthController;
