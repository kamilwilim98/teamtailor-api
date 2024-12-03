import { Injectable } from '@nestjs/common';
import { TeamtailorClient } from '../clients';

export interface Candidate {
  id: string;
  attributes: Record<string, any>;
}

@Injectable()
export class TeamtailorRepository {
  constructor(private readonly teamtailorClient: TeamtailorClient) {}

  async getAllCandidates(): Promise<Candidate[]> {
    let pageNumber = 1;
    const pageSize = 30;
    let response;
    let allCandidates = [] as any[];

    do {
      response = await this.teamtailorClient.client
        .get(
          `/candidates?page[size]=${pageSize}&page[number]=${pageNumber}&include=job-applications`,
        )
        .then((data) => data.data);

      const candidates = response.data || [];
      allCandidates = allCandidates.concat(candidates);

      pageNumber++;
    } while (response.data && response.data.length > 0);

    return allCandidates;
  }
}
