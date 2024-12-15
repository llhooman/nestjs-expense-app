import { Injectable } from '@nestjs/common';
import { data, ReportType } from "src/data"
import { v4 as uuid } from "uuid"
import { ReportResponseDto } from "src/dtos/report.dto";
interface Report {
    amount: number;
    source: string;
}
interface UpdateReport {
    amount?: number;
    source?: string;
}
@Injectable()
export class ReportService {

    getAllReports(type: ReportType): ReportResponseDto[] {
        return data.report.filter(report =>
            (report.type === type)
        ).map(item => new ReportResponseDto(item))
    }
    getReportById(type: ReportType, id: string): ReportResponseDto {
        const report = data.report.find(report =>
            report.id === id)
        if (!report) return
        return new ReportResponseDto(report)
    }
    createReport(type: ReportType, { amount, source }: Report): ReportResponseDto {
        const newReport = {
            id: uuid(),
            amount,
            source,
            created_at: new Date(),
            updated_at: new Date(),
            type
        }
        data.report.push(newReport)
        return new ReportResponseDto(newReport)
    }
    updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {
        let item = data.report.find(item => (
            item.id === id
        ))
        if (!item) return
        const reportIndex = data.report.findIndex(report => report.id === item.id)
        item = {
            ...item,
            ...body,
            updated_at: new Date()
        }
        data.report[reportIndex] = {
            ...data.report[reportIndex],
            ...body
        }
        return new ReportResponseDto(item)
    }
    deleteReport(id) {
        const reportIndex = data.report.findIndex((report) => report.id === id)
        if (reportIndex === -1) return
        data.report.splice(reportIndex, 1)
    }
}
