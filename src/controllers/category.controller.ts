import { FastifyRequest, FastifyReply } from 'fastify';
import CategoryService from '../services/categoryService';

class CategoryController {
    static async createCategory(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            //? Catching category Body
            const { latitude, longitude, category, counter } = request.body as {
                latitude: number;
                longitude: number;
                category: string;
                counter: number;
            };
            //? Creating the category in the database
            const categoryResult = await CategoryService.createCategory({ latitude, longitude, category, counter });
            if (categoryResult) {
                reply.code(201).send({
                    success: true,
                    message: "Category Created Successfully!",
                    body: categoryResult
                });
            }
        } catch (error: any) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    static async findOneCategory(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
        try {
            // Extract category id from request parameters
            const categoryId = Number(request.params.id);

            // Find category by id
            const category = await CategoryService.findOneCategory(categoryId);

            if (category) {
                // Return category if found
                reply.code(200).send({
                    success: true,
                    message: "Category Found Successfully!",
                    body: category
                });
            } else {
                // Return error if category not found
                reply.code(404).send({
                    error: 'Category not found'
                });
            }
        } catch (error: any) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    
    static async findAllCategories(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            // Retrieve all categories from the service
            const categories = await CategoryService.findAllCategories();

            // Return the list of categories
            reply.code(200).send({
                success: true,
                message: "Categories Found Successfully!",
                body: categories
            });
        } catch (error: any) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    
    
    static async updateOneCategory(request: FastifyRequest<{ Params: { id: string }, Body: { latitude?: number, longitude?: number, category?: string, counter?: number } }>, reply: FastifyReply): Promise<void> {
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
            const foundCategory = await CategoryService.findOneCategory(categoryId)
            if(foundCategory){
                // Update the category in the database
                const updatedCategory = await CategoryService.updateOneCategory(categoryId, categoryUpdateData);

                if (updatedCategory) {
                    // Return the updated category
                    reply.code(200).send({
                        success: true,
                        message: "Category Updated Successfully!",
                        body: updatedCategory
                    });
                }
                else{
                    reply.code(400).send({error:"update Failed!"})
                }
            }
            else {
                // Return error if category not found
                reply.code(404).send({
                    error: 'Category not found'
                });
            }
        } catch (error: any) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    
    static async deleteOneCategory(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
        try {
            // Extract category id from request parameters
            const categoryId = Number(request.params.id);
    
            // Check if the category exists
            const foundCategory = await CategoryService.findOneCategory(categoryId);
    
            if (foundCategory) {
                // Delete the category from the database
                const deletionResult = await CategoryService.deleteOneCategory(categoryId);
                
                if (deletionResult) {
                    // Return success message upon successful deletion
                    reply.code(200).send({
                        success: true,
                        message: "Category Deleted Successfully!",
                    });
                } else {
                    // Return error if deletion fails
                    reply.code(500).send({
                        error: 'Error deleting category'
                    });
                }
            } else {
                // Return error if category not found
                reply.code(404).send({
                    error: 'Category not found'
                });
            }
        } catch (error: any) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
    
}

export default CategoryController;
