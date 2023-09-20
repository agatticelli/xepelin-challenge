"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMapper = void 0;
const account_entity_1 = require("../entity/account.entity");
class AccountMapper {
    static toDTO(account) {
        return {
            id: account.id,
            userId: account.userId,
            ownerFullName: account.ownerFullName,
            number: account.number,
            balance: account.balance,
        };
    }
    static toDomain(raw) {
        const account = new account_entity_1.Account({
            ownerFullName: raw.ownerFullName,
            number: raw.number,
            balance: raw.balance,
            id: raw.accountId,
            userId: raw.userId,
        });
        return account;
    }
    static toPersistence(account) {
        return {
            pk: `ACCOUNT#${account.id}`,
            sk: `ACCOUNT#${account.id}`,
            userId: account.userId,
            ownerFullName: account.ownerFullName,
            number: account.number,
            balance: account.balance,
        };
    }
}
exports.AccountMapper = AccountMapper;
//# sourceMappingURL=account.mapper.js.map