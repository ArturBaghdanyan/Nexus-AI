# Nexus AI

Nexus AI is a powerful Full-Stack AI-powered code analysis tool. It enables developers to perform instant, intelligent code reviews by providing insights into potential bugs, performance bottlenecks, and code quality concerns. Simply paste a GitHub repository link, and the system will analyze your project to provide actionable feedback.


## Key Features
- AI-Powered Analysis: Leverages LLM technology (via Groq/OpenAI) to provide deep code insights.
- GitHub Integration: Built-in Octokit integration to analyze repository structures and contents directly from GitHub.
- Full-Stack Architecture: Built entirely with Next.js, utilizing Serverless API Routes for secure backend logic.
- Multilingual Support: Seamlessly handles internationalization using next-intl.
- Professional Reporting: Includes code quality scoring (Security, Performance, Clean Code) and export capabilities.

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- API Integration: Octokit (GitHub SDK)
- AI Engine: Groq LLM API
- Internationalization: next-intl

## Requirements

- Node.js 20+
- npm or pnpm

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env.local` file in the client app if needed for your AI or app configuration.

## Code Snippet
GITHUB_TOKEN=your_github_personal_access_token
GROQ_API_KEY=your_groq_api_key

### 3. Run locally

```bash
npm run dev
```


## Project Structure
- /app: Next.js App Router (pages and layouts)
- /app/api: Serverless API routes for AI and GitHub integration
- /components: Reusable UI components (Analysis, Result, Header)
- /messages: Translation files for i18n support

## Notes
- This project is built as a unified Next.js application, ensuring optimal performance and simplified deployment on Vercel or similar platforms. 
- All backend logic is securely contained within Next.js API routes, keeping your API keys protected.
