const userSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'lastname', 'phoneNumber', 'email', 'password'],
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
const loginSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 6 },
            },
        },
    }
};
export { userSchema, loginSchema };
export default { userSchema, loginSchema };
