export declare class EventStoreMapper {
    static toPersistence(key: string, version: number, eventType: string, payload: any): any;
    static fromPersistence(data: any): {
        key: string;
        version: number;
        eventType: string;
        payload: string;
    };
}
