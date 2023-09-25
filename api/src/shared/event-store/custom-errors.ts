export class StreamIdNotFoundError extends Error {
  constructor(streamId: string) {
    super(`Stream with id ${streamId} not found`);
  }
}
