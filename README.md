# Slate - Note Taking App

Slate is my midterm project featuring a full stack note taking app where users can create an account and manage their own notes. Built with Node.js, Express, MongoDB and EJS for the front end templating.

## How to run this locally

### You will need

- Node.js installed
- MongoDB installed and running on your machine, or a free MongoDB Atlas account

### Steps

1. Clone the repo

```bash
git clone https://github.com/noagortler/Note-Taking-App-Slate.git
cd Note-Taking-App-Slate
```

2. Install the dependencies

```bash
npm install
```

3. Set up your environment variables

Create a new file in the root folder called `.env` and add the following:

```
MONGODB_URI=mongodb://127.0.0.1:27017/slateDB
SESSION_SECRET=your-session-secret-here
```

4. Start the app

```bash
npm run dev
```

5. Go to http://localhost:3000 in your browser

To test the API endpoints directly you can use a tool like Postman.

## What Slate does

- Users can register and log in to their own account
- Each user can create, view, edit and delete their own notes
- Notes can be filtered by category: Notes, To-Do, or List
- Notes are saved to a database so they persist between sessions
- Nobody can see or edit anyone else's notes
- Users can delete their account and all associated notes from the settings page

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS
- CSS with Bootstrap
- Passport.js for authentication
- express-session and bcrypt for session management and password hashing

## Project Structure

```
slate/
    assets/          = static files (css, js, images)
    config/          = passport and database setup
    controllers/     = request logic
    middleware/      = auth middleware
    models/          = database schemas
    routes/          = URL route definitions
    views/           = EJS templates
    server.js        = server JS file
    .env             = environment variables
```

## API Endpoints

### Auth routes

| Action | Route       | What it does                  |
|--------|-------------|-------------------------------|
| GET    | /register   | Shows the registration page   |
| GET    | /login      | Shows the login page          |
| POST   | /register   | Creates a new user account    |
| POST   | /login      | Logs the user in              |
| POST   | /logout     | Logs the user out             |
| GET    | /settings   | Shows the settings page       |
| DELETE | /settings   | Deletes the user's account    |

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

**GET /register**

No request body. Loads the registration page.

**POST /register**

Request body:
```json
{
  "firstName": "Felix",
  "lastName": "Smith",
  "email": "felix@email.com",
  "password": "password123"
}
```

Success: redirects to `/login`

Errors:

```json
{ "message": "All fields are required." }
{ "message": "Password must be at least 6 characters." }
{ "message": "That email is already registered." }
```

### Login

**GET /login**

No request body. Loads the login page.

**POST /login**

Request body:

```json
{
  "email": "felix@email.com",
  "password": "password123"
}
```

Success: redirects to `/notes`

Errors:

```json
{ "message": "Invalid email or password." }
```

### Logout

**POST /logout**

No request body. Ends the session and redirects to `/login`.

### Settings

**GET /settings**

No request body. Loads the settings page.

**DELETE /settings**

Request body:

```json
{
  "password": "password123"
}
```

Success: deletes account and all notes, redirects to `/login`

Errors:

```json
{ "message": "Password is required." }
{ "message": "Incorrect password." }
{ "message": "Error deleting account." }
```

### Notes

**GET /notes**

No request body. Loads the dashboard with all notes for the logged in user.

**GET /notes?category=To-Do**

Same as GET /notes but filters by category. Category must be one of: `Notes`, `To-Do`, `List`.

Errors:

```json
{ "message": "Invalid category." }
```

**GET /notes/:id**

No request body.

Success response:

```json
{
  "id": "abc123...",
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
  "message": "Note updated successfully",
  "note": {
    "id": "abc123...",
    "title": "House Chores",
    "content": "1. Laundry 2. Vaccuum 3. Dishes 4. Dust (updated)",
    "category": "To-Do",
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

## Future Improvements

- Custom dropdown styling for the category selector
- Smooth page transitions
- Note search functionality
- Pin/favourite notes
- Slow colour transitions when changing categories on edit page
- Password reset via email

## Development Notes

Throughout the development of this full stack note-taking application, I encountered several challenges that highlighted gaps in my process and ultimately shaped how I approach projects moving forward. One of the biggest lessons I learned was the importance of thorough project planning before beginning development. While I did take an API-first approach and outlined all endpoints in a README prior to starting, I now recognize that this level of planning was not sufficient on its own.

I learned that documenting API routes solely within a README is not enough. As the project grew, it became increasingly difficult to navigate and reference endpoints efficiently. Moving forward, I will implement more structured and accessible documentation of routes outside of the README to allow for manageable progress tracking.

Additionally, a key mistake I made was creating page mockups only after I had already written the .ejs templates. This resulted in significant rework, as I often had to go back and restructure layouts to align with the designs. In hindsight, starting with mockups would have provided a clear visual direction and reduced unnecessary rewrites. This experience reinforced the value of planning both the front-end and back-end in parallel, rather than treating them as separate phases.

Another challenge I underestimated was CSS scoping and overall styling effort. Because the design of the application was relatively simple and I felt more confident with CSS, I assumed it would be quick to implement. Small things like the dark mode toggle, the note page height, and making sure class names did not conflict between pages ended up taking much longer than expected. This taught me not to underestimate front-end work, even for simple designs, and to approach styling with the same level of planning and structure as the rest of the application.

Overall this project gave me a much better understanding of how all the pieces of a full stack application connect, and the value of slowing down to plan before jumping into building.
