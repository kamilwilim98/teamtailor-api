import { Parser } from '@json2csv/plainjs';
import { Injectable } from '@nestjs/common';

export enum CSVSchemaType {
  CANDIDATES,
}

@Injectable()
export class CSVService {
  async JSONtoCSV(json: object[], options: object): Promise<string> {
    return new Parser(options).parse(json);
  }
}
