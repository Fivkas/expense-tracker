import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAll(): Promise<Category[]>;
    create(dto: CreateCategoryDto): Promise<Category>;
    update(id: number, dto: CreateCategoryDto): Promise<Category>;
    remove(id: number, reassignTo?: string): Promise<Category>;
}
