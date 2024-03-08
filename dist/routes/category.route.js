import CategoryController from '../controllers/category.controller';
import { categorySchema, updateOneSchema } from '../schemas/category.schema';
//* Authentication Routes
const routes = async (fastify) => {
    //* CreateCategory endpoint
    fastify.post('/create', {
        schema: categorySchema.schema,
        handler: CategoryController.createCategory,
    });
    //* FindOne Category endpoint
    fastify.get('/findone/:id', {
        handler: CategoryController.findOneCategory,
    });
    //* FindAll Categories endpoint
    fastify.get('/findall', {
        handler: CategoryController.findAllCategories,
    });
    //* UpdateOne Category endpoint
    fastify.put('/update/:id', {
        schema: updateOneSchema.schema,
        handler: CategoryController.updateOneCategory,
    });
    //* DeleteOne Category endpoint
    fastify.delete('/delete/:id', {
        handler: CategoryController.deleteOneCategory,
    });
};
export default routes;
