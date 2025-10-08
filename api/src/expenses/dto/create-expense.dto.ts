import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  categoryId: number;
}

