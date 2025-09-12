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
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Report } from './entities/report.entity';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto): Report {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll(): Report[] {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Report | undefined {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Report | null {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    return this.reportsService.remove(id);
  }
}
