import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private aiSuggestions = [
    { id: 'ai1', type: 'suggestion', content: 'Based on your interests, you might like the upcoming farmers market.' },
  ];

  findAll() {
    return this.aiSuggestions;
  }
}