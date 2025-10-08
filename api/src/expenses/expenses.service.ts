import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return expense;
  }

  async create(dto: CreateExpenseDto): Promise<Expense> {
    return this.prisma.expense.create({
      data: {
        title: dto.title,
        amount: dto.amount,
        categoryId: dto.categoryId,
      },
    });
  }

  async update(id: number, dto: CreateExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return this.prisma.expense.update({
      where: { id },
      data: {
        title: dto.title,
        amount: dto.amount,
        categoryId: dto.categoryId,
      },
    });
  }

  async delete(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return this.prisma.expense.delete({ where: { id } });
  }

  async summary() {
    return this.prisma.expense.groupBy({
      by: ['categoryId'],
      _sum: { amount: true },
      _count: { id: true },
    });
  }
}

