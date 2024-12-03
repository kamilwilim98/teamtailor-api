import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CSVService, FileSerivce } from './services';
import { TeamtailorClient } from './clients';
import { configValidationSchema } from './schema/config';
import { HttpModule } from '@nestjs/axios';
import { TeamtailorRepository } from './repository/teamtailor.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [CSVService, FileSerivce, TeamtailorClient, TeamtailorRepository],
})
export class AppModule {}
