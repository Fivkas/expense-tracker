"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.category.findMany();
    }
    async create(name) {
        return this.prisma.category.create({ data: { name } });
    }
    async update(id, name) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException(`Category with id ${id} not found`);
        return this.prisma.category.update({ where: { id }, data: { name } });
    }
    async remove(id, reassignTo) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException(`Category with id ${id} not found`);
        const dependents = await this.prisma.expense.count({ where: { categoryId: id } });
        if (dependents > 0) {
            if (!reassignTo) {
                throw new common_1.ConflictException(`Cannot delete category "${category.name}" because it has ${dependents} expense(s). ` +
                    `Delete or move them first (or call DELETE /categories/${id}?reassignTo=<otherCategoryId>).`);
            }
            const target = await this.prisma.category.findUnique({ where: { id: reassignTo } });
            if (!target) {
                throw new common_1.NotFoundException(`Target category with id ${reassignTo} not found`);
            }
            await this.prisma.expense.updateMany({
                where: { categoryId: id },
                data: { categoryId: reassignTo },
            });
        }
        return this.prisma.category.delete({ where: { id } });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map