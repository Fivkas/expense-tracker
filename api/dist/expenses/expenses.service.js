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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ExpensesService = class ExpensesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.expense.findMany();
    }
    async findOne(id) {
        const expense = await this.prisma.expense.findUnique({ where: { id } });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with id ${id} not found`);
        }
        return expense;
    }
    async create(dto) {
        return this.prisma.expense.create({
            data: {
                title: dto.title,
                amount: dto.amount,
                categoryId: dto.categoryId,
            },
        });
    }
    async update(id, dto) {
        const expense = await this.prisma.expense.findUnique({ where: { id } });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with id ${id} not found`);
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
    async delete(id) {
        const expense = await this.prisma.expense.findUnique({ where: { id } });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with id ${id} not found`);
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
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map