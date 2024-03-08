const signUpSchema = {
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
    response: {
      201: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: true },
          message: { type: 'string', default: 'Created Successfully!' },
          body: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              lastname: { type: 'string' },
              phoneNumber: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', minLength: 6 },
            },
          },         },
      },
      400: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Email already taken' },
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Server Error' },
        },
      },
    },
  },
};


//todo Done
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
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: true },
          message: { type: 'string', default: 'Logged in Successfully!' },
          token: { type: 'string' }, // Adjust the type based on the actual token type
        },
      },
      401: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Incorrect Email or Password' },
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Server Error' },
        },
      },
    },
  },
};


export { signUpSchema, loginSchema };
export default {signUpSchema, loginSchema}