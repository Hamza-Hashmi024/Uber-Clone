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

### Get User Profile

- **URL:** `/api/users/profile`
- **Method:** `GET`
- **Authentication:** Required (JWT token in cookie or `Authorization` header)

#### Description

Returns the authenticated user's profile information.

#### Request Headers

- `Cookie: token=jwt_token`  
  or  
- `Authorization: Bearer jwt_token`

#### Success Response

- **Status:** `200 OK`
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
    }
  }
  ```

#### Error Responses

- **Missing or Invalid Token (401 Unauthorized):**
  ```json
  {
    "Message": "Access Denied , No Token Provided"
  }
  ```
  or
  ```json
  {
    "Message": "Token is blacklisted , Please login again"
  }
  ```
  or
  ```json
  {
    "Message": "Invalid Token"
  }
  ```

---

### Logout User

- **URL:** `/api/users/logout`
- **Method:** `GET`
- **Authentication:** Required (JWT token in cookie or `Authorization` header)

#### Description

Logs out the authenticated user by blacklisting their JWT token for 24 hours.

#### Request Headers

- `Cookie: token=jwt_token`  
  or  
- `Authorization: Bearer jwt_token`

#### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "Message": "Logged Out Successfully"
  }
  ```

#### Error Responses

- **Missing or Invalid Token (401 Unauthorized):**
  ```json
  {
    "Message": "Access Denied , No Token Provided"
  }
  ```
  or
  ```json
  {
    "Message": "Token is blacklisted , Please login again"
  }
  ```
  or
  ```json
  {
    "Message": "Invalid Token"
  }
  ```

---

**Note:**  
- After logout, the JWT token is blacklisted and cannot be used for authentication for the next 24 hours.
- Always include the JWT token in your requests to protected routes.

### Register Captain

- **URL:** `/api/captains/register`
- **Method:** `POST`

#### Description

Registers a new captain (driver) with vehicle and location details.

#### Request Body Example

```json
{
  "fullname": {
    "firstName": "Ali",
    "lastName": "Khan"
  },
  "email": "ali.captain@example.com",
  "password": "securepassword",
  "vechicle": {
    "color": "White",
    "plate": "ABC123",
    "capicity": 4,
    "vechicleType": "car"
  },
  "location": {
    "lat": 24.8607,
    "lng": 67.0011
  }
}
```

#### Data Requirements

| Field                       | Type     | Required | Description                                      |
|-----------------------------|----------|----------|--------------------------------------------------|
| fullname.firstName          | string   | Yes      | Captain's first name (min 3 chars)               |
| fullname.lastName           | string   | Yes      | Captain's last name (min 3 chars)                |
| email                       | string   | Yes      | Must be a valid, unique email address            |
| password                    | string   | Yes      | At least 6 characters long                       |
| vechicle.color              | string   | Yes      | Vehicle color (min 3 chars)                      |
| vechicle.plate              | string   | Yes      | Vehicle plate (unique, min 3 chars)              |
| vechicle.capicity           | number   | Yes      | Vehicle capacity (min 1)                         |
| vechicle.vechicleType       | string   | Yes      | One of: `car`, `motorcycle`, `auto`              |
| location.lat                | number   | Yes      | Latitude                                         |
| location.lng                | number   | Yes      | Longitude                                        |

---

#### Success Response

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstName": "Ali",
        "lastName": "Khan"
      },
      "email": "ali.captain@example.com",
      "vechicle": {
        "color": "White",
        "plate": "ABC123",
        "capicity": 4,
        "vechicleType": "car"
      },
      "location": {
        "lat": 24.8607,
        "lng": 67.0011
      },
      "status": "inactive",
      "socketId": null
    },
    "token": "jwt_token"
  }
  ```

---

#### Validation Error Response

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name is required",
        "param": "fullname.firstName",
        "location": "body"
      },
      {
        "msg": "Vehicle plate is required",
        "param": "vechicle.plate",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

---

#### Duplicate Email or Plate Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "Message": "Captain with this email already exists"
  }
  ```
  or
  ```json
  {
    "Message": "Vehicle plate already exists"
  }
  ```

---

#### Server Error Response

- **Status:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Error message"
  }
  ```

---

**Notes:**
- All fields are required unless specified.
- Passwords are hashed before saving.
- JWT token is returned on successful registration.
- Vehicle plate and email must be unique.