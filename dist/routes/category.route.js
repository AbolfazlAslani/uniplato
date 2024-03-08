"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const category_schema_1 = require("../schemas/category.schema");
const auth_verify_1 = __importDefault(require("../utils/preHandlers/auth-verify"));
const swaggerOptions = {
    schema: {
        tags: ['Category'],
        summary: 'Categories',
    },
};
const categoryRoutes = async (fastify) => {
    // Register the JWT preHandler for all routes
    fastify.addHook('preHandler', auth_verify_1.default);
    //* CreateCategory endpoint
    fastify.post('/create', {
        schema: { ...category_schema_1.createCategorySchema.schema, ...swaggerOptions.schema },
        handler: category_controller_1.default.createCategory,
    });
    //* FindOne Category endpoint
    fastify.get('/findone/:id', {
        schema: { ...category_schema_1.findOneCategorySchema.schema, ...swaggerOptions.schema },
        handler: category_controller_1.default.findOneCategory,
    });
    //* FindAll Categories endpoint
    fastify.get('/findall', {
        schema: { ...category_schema_1.findAllCategoriesSchema.schema, ...swaggerOptions.schema },
        handler: category_controller_1.default.findAllCategories,
    });
    //* UpdateOne Category endpoint
    fastify.put('/update/:id', {
        schema: { ...category_schema_1.updateCategorySchema.schema, ...swaggerOptions.schema },
        handler: category_controller_1.default.updateOneCategory,
    });
    //* DeleteOne Category endpoint
    fastify.delete('/delete/:id', {
        schema: { ...category_schema_1.deleteOneCategorySchema.schema, ...swaggerOptions.schema },
        handler: category_controller_1.default.deleteOneCategory,
    });
};
exports.default = categoryRoutes;
