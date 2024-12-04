import { Controller, Get, Res } from '@nestjs/common';
import { TeamtailorRepository } from './repository/teamtailor.repository';
import { CSVSchemaType, CSVService } from './services';
import { csvSchemaTypeToCSVOptions } from './mappers';
import { Response } from 'express';
import { CandidatesTransformer, TransformedCandidate } from './transformers';

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

  @Get('/candidates-csv')
  async getCandidatesCSV(@Res() res: Response): Promise<void> {
    const candidates = await this.teamtailorRepository.getAllCandidates();

    const csv = await this.csvService.JSONtoCSV(
      candidates,
      csvSchemaTypeToCSVOptions[CSVSchemaType.CANDIDATES],
    );

    res
      .setHeader('Content-Type', 'text/csv')
      .setHeader('Content-Disposition', 'attachment; filename="candidates.csv"')
      .send(csv);
  }

  @Get('/candidates')
  async getCandidates(): Promise<TransformedCandidate[]> {
    const candidates = await this.teamtailorRepository.getAllCandidates();

    return CandidatesTransformer.transform(candidates);
  }
}
