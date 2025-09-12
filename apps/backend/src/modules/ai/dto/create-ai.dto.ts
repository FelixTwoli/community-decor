import { AiSuggestion } from '../entities/ai.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAiDto implements Omit<AiSuggestion, 'id'> {
  @ApiProperty({ description: 'The type of AI suggestion' })
  type: string;

  @ApiProperty({ description: 'The content of the AI suggestion' })
  content: string;
}
