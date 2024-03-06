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
}

export default CategoryController;
