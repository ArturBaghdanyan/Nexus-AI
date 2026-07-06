# Nexus AI

Nexus AI is a full-stack application that helps users review code with the power of AI. Users can paste a GitHub repository link or directly submit code snippets, and the platform analyzes them to identify potential issues, bugs, performance problems, and code quality concerns.

The system is designed to make code review faster and easier by giving developers clear insights about what needs attention in their project or source code.

## Project structure

- client: Next.js frontend with internationalization support
- server: NestJS backend API for AI generation
- docker-compose.yml: container setup for the project

## Requirements

- Node.js 20+
- npm or pnpm
- Docker (optional, for containerized setup)

## Setup

### 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Environment variables

Create a `.env.local` file in the client app if needed for your AI or app configuration.

Create a `.env` file in the server app if needed for your backend configuration.

### 3. Run locally

Start the client:

```bash
cd client
npm run dev
```

Start the server:

```bash
cd server
npm run start:dev
```

### 4. Run with Docker

```bash
docker compose up --build
```

## Available scripts

### Client

```bash
cd client
npm run dev
npm run build
npm run start
npm run lint
```

### Server

```bash
cd server
npm run start
npm run start:dev
npm run build
npm run test
```

## Notes

- The client uses Next.js App Router and next-intl for multilingual routing.
- The server exposes the AI generation API used by the client.
