# Weekend Work Submission

## 1. The Contract Table

| Component | Request (The Order) | Response (The Delivery) |
|-----------|---------------------|-------------------------|
| **Method** | GET | 200 OK (or 400/500 on error) |
| **Endpoint** | `/api/products/filter?category=Clothing` | JSON package response |
| **Headers** | `Accept: application/json` | `Content-Type: application/json` |
| **Status Code** | 200 OK / 400 Bad Request / 500 Internal Server Error | 200 OK or error status |
| **Body (Data)** | Empty for GET; category is passed as query param | `[{"id": 5, "title": "Cotton Slim-Fit T-Shirt", ...}]` inside a package |

## 2. Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant BrowserUI as Browser UI
    participant Server as Express Server
    participant Controller as Product Controller
    participant Service as Product Service
    participant Data as products.json

    User->>BrowserUI: 1. Clicks "Clothing"
    BrowserUI->>Server: 2. GET /api/products/filter?category=Clothing
    Server->>Controller: 3. Route handler receives request
    Controller->>Controller: 3a. Validate category parameter
    alt valid category
        Controller->>Service: 3b. Fetch and filter products
        Service->>Data: 3c. Read product data
        Data-->>Service: 3d. Return raw product array
        Service-->>Controller: 3e. Return filtered products
        Controller-->>BrowserUI: 4. 200 OK + JSON package
        BrowserUI-->>User: 5. renderUI()
    else invalid category
        Controller-->>BrowserUI: 4. 400 Bad Request
        BrowserUI-->>User: 5. Show error message
    end
```

## 3. GenAI Prompt

> Convert existing POST `/api/products/filter` to GET `/api/products/filter?category=value` in this Node.js/Express project:
> - `my-backend/src/routes/productRoutes.js`: Change `router.post` to `router.get`
> - `my-backend/src/controllers/productController.js`: Change `req.body` to `req.query`, add validation
> - `index.html`: Update fetch to GET with query params instead of POST with JSON body
> - Keep response format: `{status: "success", package: {products, count, appliedCategory}}`
> - Add comments explaining request/response flow
