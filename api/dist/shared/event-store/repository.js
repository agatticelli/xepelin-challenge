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
exports.EventStorageRepository = void 0;
const common_1 = require("@nestjs/common");
const database_provider_1 = require("../database.provider");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const mapper_1 = require("./mapper");
let EventStorageRepository = class EventStorageRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    async saveEvent(key, version, eventType, payload) {
        const item = mapper_1.EventStoreMapper.toPersistence(key, version, eventType, payload);
        await this.dbConnection.getClient().send(new lib_dynamodb_1.PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: item,
        }));
    }
};
exports.EventStorageRepository = EventStorageRepository;
exports.EventStorageRepository = EventStorageRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_provider_1.DBConnection])
], EventStorageRepository);
//# sourceMappingURL=repository.js.map