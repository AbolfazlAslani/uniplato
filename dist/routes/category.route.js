"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const category_schema_1 = require("../schemas/category.schema");
//* Authentication Routes
const routes = async (fastify) => {
    //* CreateCategory endpoint
    fastify.post('/create', {
        schema: category_schema_1.categorySchema.schema,
        handler: category_controller_1.default.createCategory,
    });
    //* FindOne Category endpoint
    fastify.get('/findone/:id', {
        handler: category_controller_1.default.findOneCategory,
    });
    //* FindAll Categories endpoint
    fastify.get('/findall', {
        handler: category_controller_1.default.findAllCategories,
    });
    //* UpdateOne Category endpoint
    fastify.put('/update/:id', {
        schema: category_schema_1.updateOneSchema.schema,
        handler: category_controller_1.default.updateOneCategory,
    });
    //* DeleteOne Category endpoint
    fastify.delete('/delete/:id', {
        handler: category_controller_1.default.deleteOneCategory,
    });
};
exports.default = routes;
