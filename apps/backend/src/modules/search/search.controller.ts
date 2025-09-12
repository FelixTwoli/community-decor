import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@ApiBearerAuth()
@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchPosts(
    @Query('category') category?: string,
    @Query('location') location?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.searchService.searchPosts(category, location, keyword);
  }
}
