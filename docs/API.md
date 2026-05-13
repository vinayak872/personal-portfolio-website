# API Documentation

Complete API endpoint reference for the portfolio backend.

## Base URL
```
http://localhost:5000/api
```

## Health Check

### GET /health
Check if server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-04-24T10:30:00.000Z"
}
```

---

## Blog Endpoints

### GET /blogs
Get all published blog posts with pagination.

**Query Parameters:**
- `published` (boolean, default: true) - Filter by published status
- `limit` (number, default: 10) - Number of posts per page
- `skip` (number, default: 0) - Number of posts to skip

**Example:**
```
GET /blogs?published=true&limit=5&skip=0
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with React",
      "slug": "getting-started-with-react",
      "excerpt": "Learn the basics of React...",
      "content": "Full markdown content here...",
      "author": "Admin",
      "category": "Tutorial",
      "tags": ["react", "javascript"],
      "published": true,
      "views": 150,
      "createdAt": "2024-04-20T10:00:00.000Z",
      "updatedAt": "2024-04-20T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "skip": 0
  }
}
```

---

### GET /blogs/:id
Get a single blog post by ID. Increments view count.

**Parameters:**
- `id` (string) - Blog MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with React",
    "content": "...",
    "views": 151
  }
}
```

---

### GET /blogs/slug/:slug
Get a single blog post by slug. Increments view count.

**Parameters:**
- `slug` (string) - URL-friendly slug

**Example:**
```
GET /blogs/slug/getting-started-with-react
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### POST /blogs
Create a new blog post.

**Request Body:**
```json
{
  "title": "My First Post",
  "excerpt": "A brief summary",
  "content": "Full markdown content...",
  "category": "General",
  "tags": ["web", "dev"],
  "published": false
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": { ... }
}
```

**Errors:**
- 400: Validation errors or title already exists
- 500: Server error

---

### PUT /blogs/:id
Update a blog post.

**Parameters:**
- `id` (string) - Blog MongoDB ObjectId

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "excerpt": "Updated excerpt",
  "content": "Updated content",
  "category": "Tutorial",
  "tags": ["updated", "tags"],
  "published": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog updated successfully",
  "data": { ... }
}
```

---

### DELETE /blogs/:id
Delete a blog post.

**Parameters:**
- `id` (string) - Blog MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

---

## Contact Endpoints

### POST /contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Request",
  "message": "I'd like to work on a project together..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully. I will get back to you soon!"
}
```

**Validations:**
- All fields required
- Email must be valid format
- Message max 5000 characters

**Errors:**
- 400: Validation failed
- 500: Email sending error

---

### GET /contact
Get all contact messages (admin endpoint).

**Query Parameters:**
- `read` (boolean) - Filter by read status (true/false)
- `limit` (number, default: 10) - Messages per page
- `skip` (number, default: 0) - Messages to skip

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Inquiry",
      "message": "...",
      "read": false,
      "replied": false,
      "createdAt": "2024-04-24T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 10,
    "skip": 0
  }
}
```

---

### GET /contact/:id
Get a single contact message (marks as read).

**Parameters:**
- `id` (string) - Contact MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### PATCH /contact/:id/read
Mark a message as read.

**Parameters:**
- `id` (string) - Contact MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "message": "Message marked as read",
  "data": { ... }
}
```

---

### DELETE /contact/:id
Delete a contact message.

**Parameters:**
- `id` (string) - Contact MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Blog not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": { /* development only */ }
}
```

---

## Request/Response Format

All responses follow this standard format:

```json
{
  "success": true/false,
  "message": "Optional message",
  "data": {},
  "error": {}
}
```

**HTTP Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request / Validation Error
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting (Future Enhancement)

Currently, no rate limiting is implemented. Consider adding for production:
- Blog endpoints: 100 requests/hour
- Contact endpoint: 5 requests/hour per IP
- Use `express-rate-limit` package

---

## CORS Configuration

Frontend URL: `http://localhost:3000` (configurable via `FRONTEND_URL` env var)

Only requests from configured frontend URL are accepted.

---

## Testing with cURL

### Get all blogs
```bash
curl http://localhost:5000/api/blogs
```

### Create a blog post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "excerpt": "Test excerpt",
    "content": "Test content",
    "published": true
  }'
```

### Submit contact form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "This is a test"
  }'
```

---

## Frontend Integration Example

```javascript
// Get all blogs
const response = await fetch('http://localhost:5000/api/blogs');
const json = await response.json();

// Create blog
const res = await fetch('http://localhost:5000/api/blogs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Post',
    excerpt: 'Summary',
    content: 'Full content',
    published: true
  })
});
```

---

## Version History

- **v1.0.0** (2024-04-24) - Initial release
  - Blog CRUD endpoints
  - Contact form endpoint
  - Email integration
