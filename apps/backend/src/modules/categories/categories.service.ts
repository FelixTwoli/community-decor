import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    { id: 'c1', name: 'events' },
    { id: 'c2', name: 'services' },
    { id: 'c3', name: 'for-sale' },
    { id: 'c4', name: 'jobs' },
    { id: 'c5', name: 'housing' },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: string): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: `c${this.categories.length + 1}`,
      ...createCategoryDto,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto): Category | null {
    const category = this.findOne(id);
    if (!category) return null;
    Object.assign(category, updateCategoryDto);
    return category;
  }

  remove(id: string): { deleted: boolean } {
    this.categories = this.categories.filter((c) => c.id !== id);
    return { deleted: true };
  }
}
