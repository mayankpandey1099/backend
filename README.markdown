# FLETNIX BACKEND

A **TypeScript** *Node.js* backend for the **FletNix** application, built with `Express` and `MongoDB`. It provides APIs for **user authentication**, **CSV data import**, and **show management** (listing, search, details).

## PREREQUISITES

- `Node.js` 
- `MongoDB`
- `npm`

## INSTALLATION

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fletnix-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/fletnix
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

## RUNNING THE APPLICATION

1. Build the **TypeScript** code:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

The server runs on `http://localhost:5000`.

## API ENDPOINTS

All responses follow the format: `{ status: number, message: string, data: any }`.

### AUTHENTICATION

- **POST** `/api/auth/register`
  - *Register a new user.*
  - **Body**: `{ "name": "string", "email": string, "password": string, "age": number }`
  - **Response**: `{ status: 201, message: "User registered successfully", data: { token: string, user: { name: string, email: string, age: number } } }`

- **POST** `/api/auth/login`
  - *Log in an existing user.*
  - **Body**: `{ "email": string, "password": string }`
  - **Response**: `{ status: 200, message: "User logged in successfully", data: { token: string, user: { name: string, email: string, age: number } } }`

### DATA IMPORT

- **POST** `/api/import/csv`
  - *Import show data from a CSV file (requires authentication).*
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `form-data` with key `file` (*CSV file*)
  - **Response**: `{ status: 201, message: "CSV data imported successfully", data: null }`

### SHOWS

- **GET** `/api/shows`
  - *Retrieve paginated shows, optionally filtered by type (`"Movie"` or `"Tv Show"`). Users under 18 cannot access R-rated shows.*
  - **Headers**: `Authorization: Bearer <token>`
  - **Query**: `page` (number, default: `1`), `limit` (number, default: `15`), `type` (optional: `"Movie"` or `"Tv Show"`)
  - **Response**: `{ status: 200, message: "Shows retrieved successfully", data: { shows: array, page: number, pages: number, total: number } }`

- **GET** `/api/shows/search`
  - *Search shows by title or cast. Age restrictions apply.*
  - **Headers**: `Authorization: Bearer <token>`
  - **Query**: `query` (string, *required*), `page` (number, default: `1`)
  - **Response**: `{ status: 200, message: "Shows searched successfully", data: { shows: array, page: number, pages: number, total: number } }`

- **GET** `/api/shows/:id`
  - *Retrieve details of a show by `show_id`. Age restrictions apply.*
  - **Headers**: `Authorization: Bearer <token>`
  - **Params**: `id` (string, e.g., `"s1"`)
  - **Response**: `{ status: 200, message: "Show details retrieved successfully", data: { show_id: string, type: string, title: string, ... } }`

## PROJECT STRUCTURE

```
fletnix-backend/
├── src/
│   ├── config/         # *Database configuration*
│   ├── controllers/    # *API controllers*
│   ├── middleware/     # *Authentication and file upload middleware*
│   ├── models/         # *Mongoose schemas*
│   ├── routes/         # *Express routes*
│   ├── services/       # *Business logic*
│   ├── server.ts       # *Entry point*
│   ├── utils/          # *interface defined*
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
```

## NOTES

- Ensure **MongoDB** is running before starting the server.
- Use **Postman** or similar tools to test APIs.
- All endpoints except **register** and **login** require **JWT** authentication.