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
exports.GetAccountHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const get_account_query_1 = require("../../query/get-account.query");
let GetAccountHandler = class GetAccountHandler {
    constructor() { }
    async execute(query) { }
};
exports.GetAccountHandler = GetAccountHandler;
exports.GetAccountHandler = GetAccountHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_account_query_1.GetAccountQuery),
    __metadata("design:paramtypes", [])
], GetAccountHandler);
//# sourceMappingURL=get-account.handler.js.map