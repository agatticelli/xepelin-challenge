import { DBConnection } from '../database.provider';
export declare class EventStorageRepository {
    private dbConnection;
    constructor(dbConnection: DBConnection);
    saveEvent(key: string, version: number, eventType: string, payload: any): Promise<void>;
}
