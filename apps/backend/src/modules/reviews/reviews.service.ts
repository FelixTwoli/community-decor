import { Injectable } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [
    {
      id: 'r1',
      userId: 'u1',
      reviewerId: 'u2',
      rating: 5,
      comment: 'Great to work with!',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'r2',
      userId: 'u2',
      reviewerId: 'u1',
      rating: 4,
      comment: 'Very responsive.',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Review[] {
    return this.reviews;
  }

  findOne(id: string): Review | undefined {
    return this.reviews.find((r) => r.id === id);
  }

  create(createReviewDto: CreateReviewDto): Review {
    const newReview: Review = {
      id: `r${this.reviews.length + 1}`,
      createdAt: new Date().toISOString(),
      ...createReviewDto,
    };
    this.reviews.push(newReview);
    return newReview;
  }

  update(id: string, updateReviewDto: UpdateReviewDto): Review | null {
    const review = this.findOne(id);
    if (!review) return null;
    Object.assign(review, updateReviewDto);
    return review;
  }

  remove(id: string): { deleted: boolean } {
    this.reviews = this.reviews.filter((r) => r.id !== id);
    return { deleted: true };
  }
}
