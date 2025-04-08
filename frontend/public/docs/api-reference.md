# API Reference

This reference guide provides detailed information about all Flow-API endpoints, request parameters, and response formats.

## Base URL

All API requests should be made to:

```
https://api.flow-api.com/v1
```

## Authentication

All API endpoints require authentication. Include your API key in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Users

#### Get All Users

```http
GET /users
```

Query parameters:

| Parameter | Type   | Description                                 |
|-----------|--------|---------------------------------------------|
| limit     | number | Maximum number of users to return (default: 20) |
| offset    | number | Number of users to skip (default: 0)         |
| sort      | string | Field to sort by (e.g., 'created_at')       |
| order     | string | Sort order ('asc' or 'desc')                |

Response:

```json
{
  "data": [
    {
      "id": "usr_123456",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2025-01-15T08:30:00Z",
      "updated_at": "2025-04-05T14:22:10Z"
    },
    // ...more users
  ],
  "meta": {
    "total": 156,
    "limit": 20,
    "offset": 0
  }
}
```

#### Get User by ID

```http
GET /users/:id
```

Response:

```json
{
  "id": "usr_123456",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-01-15T08:30:00Z",
  "updated_at": "2025-04-05T14:22:10Z",
  "settings": {
    "notifications": true,
    "timezone": "America/Los_Angeles"
  }
}
```

### Documents

#### Get All Documents

```http
GET /documents
```

Query parameters:

| Parameter | Type   | Description                                 |
|-----------|--------|---------------------------------------------|
| limit     | number | Maximum number of documents to return       |
| user_id   | string | Filter documents by user ID                 |
| status    | string | Filter by status ('draft', 'published')     |

Response:

```json
{
  "data": [
    {
      "id": "doc_789012",
      "title": "Project Proposal",
      "user_id": "usr_123456",
      "status": "published",
      "created_at": "2025-03-10T11:23:45Z"
    },
    // ...more documents
  ],
  "meta": {
    "total": 42,
    "limit": 20,
    "offset": 0
  }
}
```

## Error Codes

| Code | Description           |
|------|-----------------------|
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

## Rate Limits

The API enforces rate limits to ensure fair usage. Current limits:

- 100 requests per minute per API key
- 5,000 requests per day per API key

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1680123456
