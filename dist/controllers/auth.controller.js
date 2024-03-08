"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
const functions_1 = require("../utils/functions");
class AuthController {
    static async signUp(request, reply) {
        try {
            //? Catching Body
            const { name, lastname, phoneNumber, email, password } = request.body;
            //* Hashing password before adding to the database
            const hashedPassword = await (0, functions_1.hashPassword)(password);
            //? Creating New User in database with Prisma
            const user = await (0, userService_1.createUser)({ name, lastname, phoneNumber, email, password: hashedPassword });
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
            const result = await (0, userService_1.findUserByEmail)(email);
            if (result) {
                // ? Verify Password
                const passwordVerification = await (0, functions_1.verifyPassword)(password, result.password);
                if (passwordVerification) {
                    // * Sign JWT
                    const token = await (0, functions_1.signJwt)(result.id);
                    reply.code(200).send({
                        success: true,
                        message: "Logged in Successfully!",
                        token,
                    });
                    // Important: Return here to avoid executing the following 401 response
                    return;
                }
            }
            // If the function hasn't returned, the email or password is incorrect
            reply.code(401).send({ error: "Incorrect Email or Password" });
        }
        catch (error) {
            reply.code(500).send({ error: "Internal Server Error" });
        }
    }
}
exports.default = AuthController;
