import {
  Controller, Get, Post, Put, Delete,
  Body, Param, ParseIntPipe, Query
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(dto.name);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, dto.name);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('reassignTo') reassignTo?: string, // ?reassignTo=2
  ): Promise<Category> {
    const targetId = reassignTo ? Number(reassignTo) : undefined;
    return this.categoriesService.remove(id, targetId);
  }
}

