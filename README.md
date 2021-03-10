# Ticket issue system

This is a simple application which helps client to make tickets on issues and get help from the representative.

### User API

| #   | Routers          | METHOD | Description                          |
| --- | ---------------- | ------ | ------------------------------------ |
| 1   | 'v1/user'        | GET    | Get all the user information         |
| 2   | 'v1/user/login'  | POST   | Verify user login and authentication |
| 3   | 'v1/user/logout' | DELETE | Logs out the user from the system    |

### Ticket API

| #   | Routers         | METHOD | Description |
| --- | --------------- | ------ | ----------- |
| 1   | 'v1/ticket'     | GET    |             |
| 2   | 'v1/ticet/{id}' | POST   |             |

### Tokens API

| #   | Routers     | METHOD | Description |
| --- | ----------- | ------ | ----------- |
| 1   | 'v1/tokens' | GET    |             |
