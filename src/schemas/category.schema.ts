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
}
export default categorySchema;