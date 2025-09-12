import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  private reports: Report[] = [
    {
      id: 'rp1',
      reporterId: 'u1',
      contentId: 'p2',
      reason: 'Spam',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Report[] {
    return this.reports;
  }

  findOne(id: string): Report | undefined {
    return this.reports.find((r) => r.id === id);
  }

  create(createReportDto: CreateReportDto): Report {
    const newReport: Report = {
      id: `rp${this.reports.length + 1}`,
      createdAt: new Date().toISOString(),
      ...createReportDto,
    };
    this.reports.push(newReport);
    return newReport;
  }

  update(id: string, updateReportDto: UpdateReportDto): Report | null {
    const report = this.findOne(id);
    if (!report) return null;
    Object.assign(report, updateReportDto);
    return report;
  }

  remove(id: string): { deleted: boolean } {
    this.reports = this.reports.filter((r) => r.id !== id);
    return { deleted: true };
  }
}
