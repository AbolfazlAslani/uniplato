const createCategorySchema = {
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
    response: {
      201: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: true },
          message: { type: 'string', default: 'Category Created Successfully!' },
          body: { type: 'object' }, // Adjust the type based on the actual response body
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Server Error' },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
};

const updateCategorySchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' }, // Assuming id is a UUID, adjust as needed
      },
    },
    body: {
      type: 'object',
      properties: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        category: { type: 'string' },
        counter: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: true },
          message: { type: 'string', default: 'Category Updated Successfully!' },
          body: { type: 'object' }, // Adjust the type based on the actual response body
        },
      },
      400: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Bad Request' },
        },
      },
      404: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Category not found' },
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Server Error' },
        },
      },

    },
    security: [{ bearerAuth: [] }],

  },
};

const findAllCategoriesSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: true },
          message: { type: 'string', default: 'Categories Found Successfully!' },
          body: { type: 'array' }, // Adjust the type based on the actual response body
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Server Error' },
        },
      },

    },
    security: [{ bearerAuth: [] }],

  },
};

const deleteOneCategorySchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' }, // Assuming id is a UUID, adjust as needed
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: true },
          message: { type: 'string', default: 'Category Deleted Successfully!' },
        },
      },
      404: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Category not found' },
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Server Error' },
        },
      },

    },
    security: [{ bearerAuth: [] }],

  },
};

const findOneCategorySchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }, // Assuming id is a UUID, adjust as needed
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: true },
          message: { type: 'string', default: 'Category Found Successfully!' },
          body: { type: 'object' }, // Adjust the type based on the actual response body
        },
      },
      404: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Category not found' },
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Server Error' },
        },
      },
    },
    security: [{ bearerAuth: [] }],

  },
};





export default {createCategorySchema,updateCategorySchema,findAllCategoriesSchema,findOneCategorySchema,deleteOneCategorySchema};
export  {createCategorySchema,updateCategorySchema,findAllCategoriesSchema,findOneCategorySchema,deleteOneCategorySchema};
