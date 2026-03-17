# Slate - Note Taking App

Slate is my midterm project featuring a full stack note taking app where users can create an account and manage their own notes. I'll be building it with Node.js, Express, MongoDB and EJS for the front end templating.

## What Slate does

- Users can register and log in to their own account
- Each user can create, view, edit and delete their own notes
- Notes can be filtered by category: Notes, To Do, or List
- Notes are saved to a database so they persist between sessions
- Nobody can see or edit anyone else's notes

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS
- CSS for styling
- express-session and bcrypt for authentication

## Project Structure

```
slate/
    controllers/     = request logic
    models/          = database schemas
    routes/          = URL route definitions
    app.js           = express app setup
    server.js        = server JS file
    .env             = environment variables
```
This will be updated as I go.

## API Endpoints

### Auth routes

| Action | Route       | What it does                  |
|--------|-------------|-------------------------------|
| GET    | /register   | Shows the registration page   |
| POST   | /register   | Creates a new user account    |
| GET    | /login      | Shows the login page          |
| POST   | /login      | Logs the user in              |
| POST   | /logout     | Logs the user out             |

### Notes routes (for logged in users only)

| Action | Route              | What it does                          |
|--------|--------------------|---------------------------------------|
| GET    | /notes             | Shows all user's notes                |
| GET    | /notes?category=   | Shows notes filtered by category      |
| POST   | /notes             | Creates a new note                    |
| GET    | /notes/:id         | Gets one note by its ID               |
| PUT    | /notes/:id         | Updates a note                        |
| DELETE | /notes/:id         | Deletes a note                        |


## Requests and Responses

### Register

**POST /register**

Request body:
```json
{
  "username": "felix",
  "email": "felix@email.com",
  "password": "password123"
}
```

Success: redirects to `/notes`

Errors:

```json
{ "error": "All fields are required." }
{ "error": "Username must be at least 3 characters." }
{ "error": "Password must be at least 6 characters." }
{ "error": "That username is already taken." }
{ "error": "That email is already registered." }
```

### Login

**POST /login**

Request body:

```json
{
  "username": "felix",
  "password": "password123"
}
```

Success: redirects to `/notes`

Errors:

```json
{ "error": "All fields are required." }
{ "error": "Invalid username or password." }
```


### Logout

**POST /logout**

No request body. Ends the session and redirects to `/login`.



### Notes

**GET /notes**

No request body. Loads the dashboard with all notes for the logged in user.


**GET /notes?category=to-do**

Same as GET /notes but filters by category. Category must be one of: `notes`, `to-do`, `list`.

Errors:

```json
{ "error": "Invalid category." }
```


**POST /notes**

Request body:

```json
{
  "title": "House Chores",
  "content": "1. Laundry 2. Vaccuum 3. Dishes",
  "category": "to-do"
}
```

Success: redirects to `/notes`

Errors:

```json
{ "error": "Title and content are required." }
{ "error": "Title cannot be longer than 100 characters." }
{ "error": "Content cannot be longer than 10000 characters." }
{ "error": "Invalid category. Must be one of: notes, to-do, list." }
```


### Notes/:id

**GET /notes/:id**

No request body.

Success response:

```json
{
  "_id": 1,
  "title": "House Chores",
  "content": "1. Laundry 2. Vaccuum 3. Dishes",
  "category": "to-do",
  "createdAt": "2026-01-15",
  "updatedAt": "2026-01-15"
}
```

Errors:

```json
{ "error": "Note not found." }
{ "error": "You are not authorized to view this note." }
```


**PUT /notes/:id**

Request body:

```json
{
  "title": "House Chores",
  "content": "1. Laundry 2. Vaccuum 3. Dishes 4. Dust (updated)",
  "category": "to-do"
}
```

Success response:

```json
{
  "success": true,
  "note": {
    "_id": 1,
    "title": "House Chores",
    "content": "1. Laundry 2. Vaccuum 3. Dishes 4. Dust (updated)",
    "category": "to-do",
    "updatedAt": "2026-01-15"
  }
}
```

Errors:

```json
{ "error": "Note not found." }
{ "error": "You are not authorized to edit this note." }
{ "error": "Title and content are required." }
{ "error": "Title cannot be longer than 100 characters." }
{ "error": "Content cannot be longer than 10000 characters." }
```



**DELETE /notes/:id**

No request body.

Success response:

```json
{
  "success": true,
  "message": "Note deleted successfully."
}
```

Errors:

```json
{ "error": "Note not found." }
{ "error": "You are not authorized to delete this note." }
```


