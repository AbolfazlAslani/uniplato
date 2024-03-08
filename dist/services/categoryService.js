"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// services/categoryService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryService {
    static async createCategory(categoryData) {
        try {
            const category = await prisma.category.create({
                data: categoryData,
            });
            return category;
        }
        catch (error) {
            console.error('Error creating category:', error);
            throw new Error('Error creating category');
        }
    }
    static async findAllCategories() {
        try {
            const categories = await prisma.category.findMany();
            return categories;
        }
        catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Error fetching categories');
        }
    }
    static async findOneCategory(categoryId) {
        try {
            const category = await prisma.category.findUnique({
                where: { id: categoryId },
            });
            return category;
        }
        catch (error) {
            console.error('Error fetching category:', error);
            throw new Error('Error fetching category');
        }
    }
    static async deleteOneCategory(categoryId) {
        try {
            await prisma.category.delete({
                where: { id: categoryId },
            });
            return true;
        }
        catch (error) {
            console.error('Error deleting category:', error);
            throw new Error('Error deleting category');
            return undefined;
        }
    }
    static async updateOneCategory(categoryId, updatedData) {
        try {
            const updatedCategory = await prisma.category.update({
                where: { id: categoryId },
                data: updatedData,
            });
            return updatedCategory;
        }
        catch (error) {
            console.error('Error updating category:', error);
            throw new Error('Error updating category');
        }
    }
}
exports.default = CategoryService;
