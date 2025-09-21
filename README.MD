# Uber-Clone Backend

This is the backend for an Uber-like application built with Node.js, Express, and MongoDB.

## Project Structure

```
.
├── Controllers/
│   └── user.conroller.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
├── Services/
│   └── user.services.js
├── db/
│   └── db.js
├── app.js
├── server.js
├── package.json
├── .env
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env` file and set your values for `PORT`, `DB_CONNECT`, and `JWT_SECRET`.

3. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on the port specified in `.env` (default: 3000).

---

## API Endpoints

### Register User

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Body Example:**
  ```json
  {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

#### Data Requirements

| Field                  | Type   | Required | Description                        |
|------------------------|--------|----------|------------------------------------|
| fullname.firstName     | string | Yes      | User's first name (not empty)      |
| fullname.lastName      | string | Yes      | User's last name (not empty)       |
| email                  | string | Yes      | Must be a valid email address      |
| password               | string | Yes      | At least 6 characters long         |

If any field is missing or invalid, the API responds with a `400 Bad Request` and a list of validation errors.

**Example Validation Error Response:**
```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstName",
      "location": "body"
    },
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Success Response

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john@example.com",
      "socketId": null
    },
    "token": "jwt_token"
  }
  ```

#### Server Error Response

- **Status:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Error message"
  }
  ```

---

## Notes

- Passwords are hashed before saving.
- JWT token is returned on successful registration.
- All fields are required for registration.

---

For more details, see the code in:
- `Controllers/user.conroller.js`
- `models/user.model.js`
- `routes/user.routes.js`

### Login User

- **URL:** `/api/users/login`
- **Method:** `POST`
- **Body Example:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

#### Data Requirements

| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| email    | string | Yes      | Must be a valid email address      |
| password | string | Yes      | At least 6 characters long         |

---

#### Possible Responses

- **Success (200 OK):**
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john@example.com",
      "socketId": null
    },
    "token": "jwt_token"
  }
  ```

- **Validation Error (400 Bad Request):**
  ```json
  {
    "errors": [
      {
        "msg": "Valid email is required",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **Authentication Error (400 Bad Request):**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

- **Server Error (500 Internal Server Error):**
  ```json
  {
    "message": "Error message"
  }
  ```

---

**Note:**  
- If the email or password is missing or invalid, you will get a validation error.
- If the credentials are incorrect, you will get an authentication error.
- On successful login, you receive the user object and a JWT token.