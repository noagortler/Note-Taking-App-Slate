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
    server.js        = server JS file
    .env             = environment variables
```
This will be updated as I go.

## API Endpoints

### Auth routes

| Action | Route       | What it does                  |
|--------|-------------|-------------------------------|
| GET    | /register   | Shows the registration page   |
| GET    | /login      | Shows the login page          |
| POST   | /register   | Creates a new user account    |
| POST   | /login      | Logs the user in              |
| POST   | /logout     | Logs the user out             |

### Notes routes (for logged in users only)

| Action | Route              | What it does                          |
|--------|--------------------|---------------------------------------|
| GET    | /notes             | Shows all user's notes                |
| GET    | /notes?category=   | Shows notes filtered by category      |
| GET    | /notes/:id         | Gets one note by its ID               |
| GET    | /notes/:id/edit    | Shows the edit page for a note        |
| POST   | /notes             | Creates a new note                    |
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
{ "message": "All fields are required." }
{ "message": "Username must be at least 3 characters." }
{ "message": "Password must be at least 6 characters." }
{ "message": "That username is already taken." }
{ "message": "That email is already registered." }
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
{ "message": "All fields are required." }
{ "message": "Invalid username or password." }
```


### Logout

**POST /logout**

No request body. Ends the session and redirects to `/login`.



### Notes

**GET /notes**

No request body. Loads the dashboard with all notes for the logged in user.


**GET /notes?category=To-Do**

Same as GET /notes but filters by category. Category must be one of: `Notes`, `To-do`, `List`.

Errors:

```json
{ "error": "Invalid category." }
```

**GET /notes/:id**

No request body.

Success response:

```json
{
  "_id": 1,
  "title": "House Chores",
  "content": "1. Laundry 2. Vaccuum 3. Dishes",
  "category": "To-Do",
  "createdAt": "2026-01-15",
  "updatedAt": "2026-01-15"
}
```

Errors:

```json
{ "message": "Note not found." }
{ "message": "You are not authorized to view this note." }
```

**GET /notes/:id/edit**

No request body, loads the edit page with the note's existing data.

Errors:

```json
{ "message": "Note not found." }
{ "message": "Invalid note ID." }
```

**POST /notes**

Request body:

```json
{
  "title": "House Chores",
  "content": "1. Laundry 2. Vaccuum 3. Dishes",
  "category": "To-Do"
}
```

Success: redirects to `/notes`

Errors:

```json
{ "message": "Title and content are required." }
{ "message": "Title cannot be longer than 100 characters." }
{ "message": "Content cannot be longer than 10000 characters." }
{ "message": "Invalid category. Must be one of: Notes, To-Do, List." }
```

**PUT /notes/:id**

Request body:

```json
{
  "title": "House Chores",
  "content": "1. Laundry 2. Vaccuum 3. Dishes 4. Dust (updated)",
  "category": "To-Do"
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
{ "message": "Note not found." }
{ "message": "You are not authorized to edit this note." }
{ "message": "Title and content are required." }
{ "message": "Title cannot be longer than 100 characters." }
{ "message": "Content cannot be longer than 10000 characters." }
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
{ "message": "Note not found." }
{ "message": "You are not authorized to delete this note." }
```


