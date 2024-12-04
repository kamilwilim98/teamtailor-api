import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CSVService } from './services';
import { TeamtailorClient } from './clients';
import { TeamtailorRepository } from './repository/teamtailor.repository';

import * as Joi from 'joi';
import { CacheModule } from '@nestjs/cache-manager';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  TEAMTAILOR_API_KEY: Joi.string().required(),
  TEAMTAILOR_API_URL: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [CSVService, TeamtailorClient, TeamtailorRepository],
})
export class AppModule {}
