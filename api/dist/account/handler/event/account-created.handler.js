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
exports.AccountCreatedHandler = void 0;
const events_handler_decorator_1 = require("@nestjs/cqrs/dist/decorators/events-handler.decorator");
const account_created_event_1 = require("../../event/account-created.event");
const service_1 = require("../../../shared/event-store/service");
let AccountCreatedHandler = class AccountCreatedHandler {
    constructor(eventStoreService) {
        this.eventStoreService = eventStoreService;
    }
    async handle(event) {
        await this.eventStoreService.saveEvent(event.account.id, 1, account_created_event_1.ACCOUNT_CREATED_EVENT, event.account);
    }
};
exports.AccountCreatedHandler = AccountCreatedHandler;
exports.AccountCreatedHandler = AccountCreatedHandler = __decorate([
    (0, events_handler_decorator_1.EventsHandler)(account_created_event_1.AccountCreatedEvent),
    __metadata("design:paramtypes", [service_1.EventStorageService])
], AccountCreatedHandler);
//# sourceMappingURL=account-created.handler.js.map