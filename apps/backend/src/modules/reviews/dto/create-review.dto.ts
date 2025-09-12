import { Review } from '../entities/review.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto implements Omit<Review, 'id' | 'createdAt'> {
  @ApiProperty({ description: 'The ID of the user being reviewed' })
  userId: string;

  @ApiProperty({ description: 'The ID of the user writing the review' })
  reviewerId: string;

  @ApiProperty({ description: 'The rating given (1-5)', type: Number })
  rating: number;

  @ApiProperty({ description: 'The comment of the review' })
  comment: string;
}
