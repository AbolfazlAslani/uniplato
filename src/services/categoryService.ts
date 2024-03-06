// services/categoryService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateCategoryInput {
  latitude?: number;
  longitude?: number;
  category?: string;
  counter?: number;
}

class CategoryService {
  static async createCategory(categoryData: CreateCategoryInput): Promise<any> {
    try {
      const category = await prisma.category.create({
        data: categoryData,
      });

      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error('Error creating category');
    }
  }

  static async findAllCategories(): Promise<any[]> {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Error fetching categories');
    }
  }

  static async findOneCategory(categoryId: number): Promise<any | null> {
    try {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      return category;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Error fetching category');
    }
  }

  static async deleteOneCategory(categoryId: number): Promise<void> {
    try {
      await prisma.category.delete({
        where: { id: categoryId },
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error('Error deleting category');
    }
  }

  static async updateOneCategory(categoryId: number, updatedData: CreateCategoryInput): Promise<any> {
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: updatedData,
      });

      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
      throw new Error('Error updating category');
    }
  }
}

export default CategoryService;
