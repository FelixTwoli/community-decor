import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
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