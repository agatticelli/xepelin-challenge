"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const cqrs_1 = require("@nestjs/cqrs");
class Account extends cqrs_1.AggregateRoot {
    constructor(props) {
        super();
        this.id = props.id;
        this.userId = props.userId;
        this.ownerFullName = props.ownerFullName;
        this.number = props.number;
        this.balance = props.balance;
    }
}
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map