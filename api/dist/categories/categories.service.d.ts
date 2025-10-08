import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Category[]>;
    create(name: string): Promise<Category>;
    update(id: number, name: string): Promise<Category>;
    remove(id: number, reassignTo?: number): Promise<Category>;
}
