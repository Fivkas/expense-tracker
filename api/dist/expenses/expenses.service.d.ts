import { PrismaService } from '../prisma.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Expense[]>;
    findOne(id: number): Promise<Expense>;
    create(dto: CreateExpenseDto): Promise<Expense>;
    update(id: number, dto: CreateExpenseDto): Promise<Expense>;
    delete(id: number): Promise<Expense>;
    summary(): Promise<(import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ExpenseGroupByOutputType, "categoryId"[]> & {
        _sum: {
            amount: number | null;
        };
        _count: {
            id: number;
        };
    })[]>;
}
