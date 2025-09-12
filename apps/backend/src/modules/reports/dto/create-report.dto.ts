import { Report } from '../entities/report.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto implements Omit<Report, 'id' | 'createdAt'> {
  @ApiProperty({ description: 'The ID of the user reporting' })
  reporterId: string;

  @ApiProperty({ description: 'The ID of the content being reported' })
  contentId: string;

  @ApiProperty({ description: 'The reason for the report' })
  reason: string;
}
