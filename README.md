# GitHub Profile Challenge

Technical challenge developed with **NestJS** and **Next.js**.

## Features

- REST API built with NestJS
- Fetches public profile information from the GitHub API
- Frontend built with Next.js
- Responsive UI using Tailwind CSS
- Error handling for invalid GitHub usernames

## Tech Stack

### Backend

- NestJS
- TypeScript

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

## Project Structure

```
github-profile-challenge/
│
├── backend/
└── frontend/
```

## Running locally

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Runs on:

```
http://localhost:3001
```

Example endpoint:

```
GET /user/HonorDark
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

## API Response Example

```json
{
  "username": "HonorDark",
  "name": "Diego Axel Chambi Honor",
  "bio": "Full Stack Developer",
  "publicRepositories": 12,
  "followers": 15
}
```