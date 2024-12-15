import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ReportController } from './report/report.controller';
import { ReportService } from './report/report.service';
import { ReportModule } from './report/report.module';
import { SummaryController } from './summary/summary.controller';
import { SummaryService } from './summary/summary.service';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [ReportModule, SummaryModule],
  controllers: [AppController, ReportController, SummaryController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }, ReportService, SummaryService],
})
export class AppModule { }
