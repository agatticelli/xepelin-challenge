import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
export declare class DBConnection {
    private dbClient;
    private dbDocumentClient;
    constructor();
    getClient(): DynamoDBDocumentClient;
}
