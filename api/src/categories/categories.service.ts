import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async create(name: string): Promise<Category> {
    return this.prisma.category.create({ data: { name } });
  }

  async update(id: number, name: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return this.prisma.category.update({ where: { id }, data: { name } });
  }

  /**
  * Deletes a category. If it has expenses:
  * - If reassignTo was NOT given => 409 Conflict with understandable message.
  * - If reassignTo was given => transfers all expenses to the new category and then deletes.
   */
  async remove(id: number, reassignTo?: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    const dependents = await this.prisma.expense.count({ where: { categoryId: id } });

    if (dependents > 0) {
      if (!reassignTo) {
        throw new ConflictException(
          `Cannot delete category "${category.name}" because it has ${dependents} expense(s). ` +
          `Delete or move them first (or call DELETE /categories/${id}?reassignTo=<otherCategoryId>).`
        );
      }
      // confirmed that the destination exists
      const target = await this.prisma.category.findUnique({ where: { id: reassignTo } });
      if (!target) {
        throw new NotFoundException(`Target category with id ${reassignTo} not found`);
      }
      // moved all expenses to the new category
      await this.prisma.expense.updateMany({
        where: { categoryId: id },
        data: { categoryId: reassignTo },
      });
    }

    return this.prisma.category.delete({ where: { id } });
  }
}

