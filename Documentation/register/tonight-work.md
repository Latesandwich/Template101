# Tonight Work Submission

## 1. The Contract Table

| Component | Request (The Order) | Response (The Delivery) |
|-----------|---------------------|-------------------------|
| **Register** | POST `/api/register` with `{name, email, password}` | 201 Created / 400 Bad Request / 409 Conflict |
| **Login** | POST `/api/login` with `{email, password}` | 200 OK with JWT token / 401 Unauthorized / 404 Not Found |
| **Headers** | `Content-Type: application/json` | `Content-Type: application/json` |
| **Body (Data)** | `{name, email, password}` or `{email, password}` | `{status, message, token, user}` or error |

## 2. Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant BrowserUI as Browser UI
    participant Server as Express Server
    participant AuthCtrl as Auth Controller
    participant AuthSvc as Auth Service
    participant Data as users.json

    rect rgb(200, 220, 255)
    Note over User,Data: Register Flow
    User->>BrowserUI: 1. Fill register form
    BrowserUI->>Server: 2. POST /api/register {name, email, password}
    Server->>AuthCtrl: 3. Validate input & hash password
    AuthCtrl->>AuthSvc: 4. Check if user exists
    AuthSvc->>Data: 5. Search users.json
    alt user not found
        AuthSvc->>Data: 6. Save new user
        AuthSvc-->>AuthCtrl: 7. Return success
        AuthCtrl-->>BrowserUI: 8. 201 Created + message
    else user exists
        AuthCtrl-->>BrowserUI: 9. 409 Conflict
    end
    end

    rect rgb(220, 200, 255)
    Note over User,Data: Login Flow
    User->>BrowserUI: 10. Enter credentials
    BrowserUI->>Server: 11. POST /api/login {email, password}
    Server->>AuthCtrl: 12. Receive credentials
    AuthCtrl->>AuthSvc: 13. Validate credentials
    AuthSvc->>Data: 14. Find user by email
    alt credentials valid
        AuthSvc->>AuthSvc: 15. Generate JWT token
        AuthSvc-->>AuthCtrl: 16. Return token & user
        AuthCtrl-->>BrowserUI: 17. 200 OK + token
        BrowserUI-->>User: 18. Redirect to dashboard
    else invalid
        AuthCtrl-->>BrowserUI: 19. 401 Unauthorized
    end
    end
```

## 3. GenAI Prompt

> Implement authentication system in Node.js/Express:
> - **Register endpoint** (`POST /api/register`): Validate email/password strength, hash password, check duplicate users, save to users.json
> - **Login endpoint** (`POST /api/login`): Verify credentials against users.json, generate JWT token on success
> - **Validation**: Password min 8 chars with uppercase, lowercase, number, special char; email format check
> - **Response format**: `{status: "success"/"error", message: string, token?: string, user?: {id, name, email}}`
> - Add middleware for JWT verification on protected routes
