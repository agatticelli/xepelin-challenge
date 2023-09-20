import { Module } from '@nestjs/common';
import { DBConnection } from './database.provider';
import { EventStorageService } from './event-store/service';
import { EventStorageRepository } from './event-store/repository';

@Module({
  imports: [],
  controllers: [],
  providers: [DBConnection, EventStorageService, EventStorageRepository],
  exports: [DBConnection, EventStorageService],
})
export class SharedModule {}
