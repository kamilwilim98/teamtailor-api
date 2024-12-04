import { Inject, Injectable } from '@nestjs/common';
import { TeamtailorClient } from '../clients';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheResult } from '../decorators/cache-result.decorator';

export interface Candidate {
  id: string;
  attributes: Record<string, any>;
  relationships: Record<string, any>;
}

@Injectable()
export class TeamtailorRepository {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly teamtailorClient: TeamtailorClient,
  ) {}

  @CacheResult(60000)
  async getAllCandidates(): Promise<Candidate[]> {
    let pageNumber = 1;
    const pageSize = 30;
    let response;
    let allCandidates: Candidate[] = [];

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
