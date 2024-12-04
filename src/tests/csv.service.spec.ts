import { csvSchemaTypeToCSVOptions } from '../mappers';
import { CSVSchemaType, CSVService } from '../services';
import { candidates } from './fixtures/candidates';

describe('CSVService', () => {
  it('JSONtoCSV', async () => {
    const service = new CSVService();
    const output = await service.JSONtoCSV(
      candidates,
      csvSchemaTypeToCSVOptions[CSVSchemaType.CANDIDATES],
    );
    expect(output).toMatch(
      /(25235329|25235330|2016-08-13T17:08:25.194+02:00|hugo_cederlund_13_sandbox_teamtailor_developer@example.com|Lill|Friman)/i,
    );
  });
});
