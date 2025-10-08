import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async getAll(): Promise<Expense[]> {
    return this.expensesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Expense> {
    return this.expensesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateExpenseDto): Promise<Expense> {
    return this.expensesService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateExpenseDto,
  ): Promise<Expense> {
    return this.expensesService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Expense> {
    return this.expensesService.delete(id);
  }

  @Get('summary')
  async summary() {
    return this.expensesService.summary();
  }
}

