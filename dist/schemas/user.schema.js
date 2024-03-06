"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'lastname', 'phoneNumber', 'email', 'password', 'confirmPassword'],
            properties: {
                name: { type: 'string' },
                lastname: { type: 'string' },
                phoneNumber: { type: 'string' },
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 6 },
            },
        },
    }
};
exports.default = userSchema;
