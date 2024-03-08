const categorySchema = {
    schema: {
        body: {
            type: 'object',
            required: ['latitude', 'longitude', 'category', 'counter'],
            properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                category: { type: 'string' },
                counter: { type: 'number' },
            },
        },
    }
};
const updateOneSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'Category ID' },
            },
            required: ['id'],
        },
        body: {
            type: 'object',
            properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                category: { type: 'string' },
                counter: { type: 'number' },
            },
            additionalProperties: false,
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                    body: { type: 'object' },
                },
            },
            '4xx': {
                type: 'object',
                properties: {
                    error: { type: 'string' },
                },
            },
        },
    },
};
export { categorySchema, updateOneSchema };
export default { categorySchema, updateOneSchema };