import { EventStorageRepository } from './repository';
export declare class EventStorageService {
    private readonly eventStorageRespository;
    constructor(eventStorageRespository: EventStorageRepository);
    saveEvent(key: string, version: number, eventName: string, payload: any): Promise<void>;
}
