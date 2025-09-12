import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AiSuggestion } from './entities/ai.entity';

@ApiTags('ai')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  create(@Body() createAiDto: CreateAiDto): AiSuggestion {
    return this.aiService.create(createAiDto);
  }

  @Get()
  findAll(): AiSuggestion[] {
    return this.aiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): AiSuggestion | undefined {
    return this.aiService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAiDto: UpdateAiDto,
  ): AiSuggestion | null {
    return this.aiService.update(id, updateAiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    return this.aiService.remove(id);
  }
}
