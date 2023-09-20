"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const create_account_command_1 = require("./command/create-account.command");
const account_mapper_1 = require("./mapper/account.mapper");
const common_1 = require("@nestjs/common");
let AccountService = class AccountService {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async createAccount(userId, accountId, accountData) {
        const account = account_mapper_1.AccountMapper.toDomain({
            ...accountData,
            userId,
            accountId,
            balance: 0,
        });
        return this.commandBus.execute(new create_account_command_1.CreateAccountCommand(account));
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        cqrs_1.CommandBus])
], AccountService);
//# sourceMappingURL=account.service.js.map