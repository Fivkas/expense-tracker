import { ExpensesService } from './expenses.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    getAll(): Promise<Expense[]>;
    getOne(id: number): Promise<Expense>;
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
