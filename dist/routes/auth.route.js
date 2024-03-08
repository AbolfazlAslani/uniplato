"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// auth.route.ts
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const user_schema_1 = require("../schemas/user.schema");
// Swagger options for each route
const swaggerOptions = {
    schema: {
        tags: ['Auth'], // Group routes under the 'auth' category
        summary: 'Sign up or log in user', // Add a summary for the route
        // Additional Swagger options...
    },
};
//* Authentication Routes
const routes = async (fastify) => {
    //* Signup endpoint
    fastify.post('/signup', {
        schema: { ...user_schema_1.signUpSchema.schema, ...swaggerOptions.schema },
        handler: auth_controller_1.default.signUp,
    });
    //* Login endpoint
    fastify.post('/login', {
        schema: { ...user_schema_1.loginSchema.schema, ...swaggerOptions.schema },
        handler: auth_controller_1.default.Login,
    });
};
exports.default = routes;
