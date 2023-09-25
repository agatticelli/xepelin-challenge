export class AccountNotFoundError extends Error {
  constructor(accountId: string) {
    super(`Account ${accountId} not found`);
  }
}
