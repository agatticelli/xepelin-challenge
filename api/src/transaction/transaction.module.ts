import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionHandler } from './handler/command/create-transaction.handler';
import { SharedModule } from '../shared/shared.module';
import { TransactionCreatedHandler } from './handler/event/transaction-created.handler';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [SharedModule, CqrsModule],
  controllers: [TransactionController],
  providers: [TransactionService, CreateTransactionHandler, TransactionCreatedHandler],
})
export class TransactionModule {}
