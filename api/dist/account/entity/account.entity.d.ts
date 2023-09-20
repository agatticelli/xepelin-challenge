import { AggregateRoot } from '@nestjs/cqrs';
interface IAccountProps {
    id: string;
    userId: string;
    ownerFullName: string;
    number: number;
    balance: number;
}
export declare class Account extends AggregateRoot {
    id: string;
    userId: string;
    ownerFullName: string;
    number: number;
    balance: number;
    constructor(props: IAccountProps);
}
export {};
