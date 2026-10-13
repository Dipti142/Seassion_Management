# Session Management

One active device per user.

## APIs

| Method | Path | Body |
| --- | --- | --- |
| POST | `/api/auth/register` | `{ name, email, password }` |
| POST | `/api/auth/login` | `{ email, password }` |
| POST | `/api/auth/force-login` | `{ email, password }` |
| POST | `/api/auth/logout` | Bearer token |

## Rules

- Logged in: `login_At` is set and `logout_At` is empty
- Login while already logged in → `409 ALREADY_LOGGED_IN`
- Force login → this device wins, old device gets `force_logout`
- Logout → sets `logout_At`
