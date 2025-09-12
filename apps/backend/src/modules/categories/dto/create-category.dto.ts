import { Category } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto implements Omit<Category, 'id'> {
  @ApiProperty({ description: 'The name of the category' })
  name: string;
}
