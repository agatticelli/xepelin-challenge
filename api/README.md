
# Xepelin Challenge

## Development

### Run locally
In order to run both backend and frontend locally, you just need to run
```bash
docker compose up --build
```

### Restart DB status
If, for any reason, you need to delete the entire table and start fresh, just run
```bash
docker compose up -d # start containers
aws dynamodb delete-table --table-name accounts --endpoint-url http://localhost:8000 # delete table manually
docker compose restart # restart other containers
```

## Testing
In order to run tests, just run
```bash
yarn test:e2e
```
If this command failes due to timeout the first time, it can be because it timeouts before dynamodb docker image is fully downloaded.
If this is the case, then run
```bash
docker compose up
```

## Design decisions
- I decided to use a Single Table Design with DynamoDB in order to facilitate the development and avoid the need of joins. This is a very common pattern in NoSQL databases.

- I created my own authentication system using JWT. A production ready environment should use something like Cognito, but I created a naive auth service in order to avoid the need of a third party service.

- I read configuration from a constants file, but for production I would use something like AWS Parameter Store or AWS Secrets Manager.