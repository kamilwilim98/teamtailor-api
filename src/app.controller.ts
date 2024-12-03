import { Controller, Get, Res } from '@nestjs/common';
import { TeamtailorRepository } from './repository/teamtailor.repository';
import { CSVSchemaType, CSVService } from './services';
import { csvSchemaTypeToCSVOptions } from './mappers';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly teamtailorRepository: TeamtailorRepository,
    private readonly csvService: CSVService,
  ) {}

  @Get('healthz')
  getHealthcheck(): string {
    return 'OK';
  }

  @Get('/candidates')
  async getCandidatesCSV(@Res() response: Response): Promise<void> {
    try {
      const candidates = await this.teamtailorRepository.getAllCandidates();

      const csv = await this.csvService.JSONtoCSV(
        candidates,
        csvSchemaTypeToCSVOptions[CSVSchemaType.CANDIDATES],
      );

      response
        .setHeader('Content-Type', 'text/csv')
        .setHeader('Content-Disposition', 'attachment; filename="candidates.csv"')
        .send(csv);
    } catch (error) {
      console.error('Error generating CSV:', error);
      response.status(500).send('Error generating CSV file');
    }
  }
}
