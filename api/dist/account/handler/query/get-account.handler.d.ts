import { IQueryHandler } from '@nestjs/cqrs';
import { GetAccountQuery } from 'src/account/query/get-account.query';
export declare class GetAccountHandler implements IQueryHandler<GetAccountQuery> {
    constructor();
    execute(query: GetAccountQuery): Promise<void>;
}
