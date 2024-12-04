import { Candidate } from '../repository/teamtailor.repository';

export interface TransformedCandidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobApplicationId: string;
  jobApplicationCreatedAt: Date;
}

export class CandidatesTransformer {
  static transform(candidates: Candidate[]): TransformedCandidate[] {
    return candidates.map((candidate) => ({
      id: candidate.id,
      firstName: candidate.attributes['first-name'],
      lastName: candidate.attributes['last-name'],
      email: candidate.attributes['email'],
      jobApplicationId: candidate.relationships['job-applications'].data[0].id,
      jobApplicationCreatedAt: candidate.attributes['created-at'],
    }));
  }
}
