export class EventStoreMapper {
  static toPersistence(streamId: string, version: number, eventType: string, payload: any): any {
    return {
      pk: `EVENT#${streamId}`,
      sk: version.toString().padStart(10, '0'),
      eventType,
      payload,
    };
  }

  static fromPersistence(data: any) {
    const [, userId, accountId] = data.pk.split('#');

    return {
      accountId,
      userId,
      version: parseInt(data.sk),
      eventType: data.eventType as string,
      payload: data.payload as string,
    };
  }
}
