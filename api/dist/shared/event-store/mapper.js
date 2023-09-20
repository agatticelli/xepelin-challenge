"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreMapper = void 0;
class EventStoreMapper {
    static toPersistence(key, version, eventType, payload) {
        return {
            pk: `EVENT#${key}`,
            sk: version.toString().padStart(10, '0'),
            eventType,
            payload,
        };
    }
    static fromPersistence(data) {
        return {
            key: data.pk.replace('EVENT#', ''),
            version: parseInt(data.sk),
            eventType: data.eventType,
            payload: data.payload,
        };
    }
}
exports.EventStoreMapper = EventStoreMapper;
//# sourceMappingURL=mapper.js.map