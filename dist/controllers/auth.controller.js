"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
const functions_1 = __importDefault(require("../functions/functions"));
class AuthController {
    static async signUp(request, reply) {
        try {
            //? Catching Body
            const { name, lastname, phoneNumber, email, password } = request.body;
            //* Hashing password before adding to the database
            const hashedPassword = await (0, functions_1.default)(password);
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
}
exports.default = AuthController;
