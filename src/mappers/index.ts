import { CSVSchemaType } from '../services';

export const csvSchemaTypeToCSVOptions = {
  [CSVSchemaType.CANDIDATES]: {
    fields: [
      {
        label: 'candidate_id',
        value: 'id',
      },
      { label: 'first_name', value: 'attributes.first-name' },
      { label: 'last_name', value: 'attributes.last-name' },
      { label: 'email', value: 'attributes.email' },
      {
        label: 'job_application_id',
        value: 'relationships.job-applications.data[0].id',
      },
      {
        label: 'job_application_created_at',
        value: 'attributes.created-at',
      },
    ],
  },
};
