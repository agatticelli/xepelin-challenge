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
exports.CreateAccountHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const account_repository_1 = require("../../account.repository");
const create_account_command_1 = require("../../command/create-account.command");
const account_created_event_1 = require("../../event/account-created.event");
let CreateAccountHandler = class CreateAccountHandler {
    constructor(accountRepository, eventBus) {
        this.accountRepository = accountRepository;
        this.eventBus = eventBus;
    }
    async execute(command) {
        const { account } = command;
        await this.accountRepository.create(account);
        this.eventBus.publish(new account_created_event_1.AccountCreatedEvent(account));
    }
};
exports.CreateAccountHandler = CreateAccountHandler;
exports.CreateAccountHandler = CreateAccountHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.CommandHandler)(create_account_command_1.CreateAccountCommand),
    __metadata("design:paramtypes", [account_repository_1.AccountRepository,
        cqrs_1.EventBus])
], CreateAccountHandler);
//# sourceMappingURL=create-account.handler.js.map