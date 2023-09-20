import { ICommand } from '@nestjs/cqrs';
import { Account } from '../entity/account.entity';

export class CreateAccountCommand implements ICommand {
  constructor(public readonly account: Account) {}
}
