import { Injectable } from '@nestjs/common';
import { EventStorageRepository } from './repository';

@Injectable()
export class EventStorageService {
  constructor(private readonly eventStorageRespository: EventStorageRepository) {}

  async saveEvent(streamId: string, version: number, eventName: string, payload: any): Promise<void> {
    await this.eventStorageRespository.saveEvent(streamId, version, eventName, payload);
  }

  async getEvents(streamId: string) {
    return this.eventStorageRespository.getEvents(streamId);
  }
}
