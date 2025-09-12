import { Injectable } from '@nestjs/common';
import { AiSuggestion } from './entities/ai.entity';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';

@Injectable()
export class AiService {
  private aiSuggestions: AiSuggestion[] = [
    {
      id: 'ai1',
      type: 'suggestion',
      content:
        'Based on your interests, you might like the upcoming farmers market.',
    },
  ];

  findAll(): AiSuggestion[] {
    return this.aiSuggestions;
  }

  findOne(id: string): AiSuggestion | undefined {
    return this.aiSuggestions.find((s) => s.id === id);
  }

  create(createAiDto: CreateAiDto): AiSuggestion {
    const newSuggestion: AiSuggestion = {
      id: `ai${this.aiSuggestions.length + 1}`,
      ...createAiDto,
    };
    this.aiSuggestions.push(newSuggestion);
    return newSuggestion;
  }

  update(id: string, updateAiDto: UpdateAiDto): AiSuggestion | null {
    const suggestion = this.findOne(id);
    if (!suggestion) return null;
    Object.assign(suggestion, updateAiDto);
    return suggestion;
  }

  remove(id: string): { deleted: boolean } {
    this.aiSuggestions = this.aiSuggestions.filter((s) => s.id !== id);
    return { deleted: true };
  }
}
