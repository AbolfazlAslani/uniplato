"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryService_1 = __importDefault(require("../services/categoryService"));
class CategoryController {
    static async createCategory(request, reply) {
        try {
            //? Catching category Body
            const { latitude, longitude, category, counter } = request.body;
            //? Creating the category in the database
            const categoryResult = await categoryService_1.default.createCategory({ latitude, longitude, category, counter });
            if (categoryResult) {
                reply.code(201).send({
                    success: true,
                    message: "Category Created Successfully!",
                    body: categoryResult
                });
            }
        }
        catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    static async findOneCategory(request, reply) {
        try {
            // Extract category id from request parameters
            const categoryId = Number(request.params.id);
            // Find category by id
            const category = await categoryService_1.default.findOneCategory(categoryId);
            if (category) {
                // Return category if found
                reply.code(200).send({
                    success: true,
                    message: "Category Found Successfully!",
                    body: category
                });
            }
            else {
                // Return error if category not found
                reply.code(404).send({
                    error: 'Category not found'
                });
            }
        }
        catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    static async findAllCategories(request, reply) {
        try {
            // Retrieve all categories from the service
            const categories = await categoryService_1.default.findAllCategories();
            // Return the list of categories
            reply.code(200).send({
                success: true,
                message: "Categories Found Successfully!",
                body: categories
            });
        }
        catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    static async updateOneCategory(request, reply) {
        try {
            // Extract category id from request parameters
            const categoryId = Number(request.params.id);
            // Extract category update data from request body
            const categoryUpdateData = request.body;
            const requestBodyIsEmpty = Object.keys(request.body).length === 0;
            if (requestBodyIsEmpty) {
                // Respond with an error if the request body is empty
                reply.code(400).send({
                    error: 'Please provide valid data for update.',
                });
                return;
            }
            const foundCategory = await categoryService_1.default.findOneCategory(categoryId);
            if (foundCategory) {
                // Update the category in the database
                const updatedCategory = await categoryService_1.default.updateOneCategory(categoryId, categoryUpdateData);
                if (updatedCategory) {
                    // Return the updated category
                    reply.code(200).send({
                        success: true,
                        message: "Category Updated Successfully!",
                        body: updatedCategory
                    });
                }
                else {
                    reply.code(400).send({ error: "update Failed!" });
                }
            }
            else {
                // Return error if category not found
                reply.code(404).send({
                    error: 'Category not found'
                });
            }
        }
        catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    static async deleteOneCategory(request, reply) {
        try {
            // Extract category id from request parameters
            const categoryId = Number(request.params.id);
            // Check if the category exists
            const foundCategory = await categoryService_1.default.findOneCategory(categoryId);
            if (foundCategory) {
                // Delete the category from the database
                const deletionResult = await categoryService_1.default.deleteOneCategory(categoryId);
                if (deletionResult) {
                    // Return success message upon successful deletion
                    reply.code(200).send({
                        success: true,
                        message: "Category Deleted Successfully!",
                    });
                }
                else {
                    // Return error if deletion fails
                    reply.code(500).send({
                        error: 'Error deleting category'
                    });
                }
            }
            else {
                // Return error if category not found
                reply.code(404).send({
                    error: 'Category not found'
                });
            }
        }
        catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
}
exports.default = CategoryController;
