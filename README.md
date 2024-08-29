# NextFlex
## Tech Stack

A Next.js starter template with the following tech stack:

- **Neon**: Serverless Postgres database
- **NextJS**: Powering both frontend and backend
- **Drizzle ORM**: Efficient database operations
- **Lucia**: Secure authentication and authorization
- **TailwindCSS**: Utility-first CSS framework
- **ShadCN**: Customizable UI components

## Getting Started

### Prerequisites

- Ensure you have Node.js installed (version 14 or later)
- Obtain Google OAuth credentials:
  - Google Client ID
  - Google Client Secret
- Get a Neon Database URL

### Setup

1. If you have Nix installed:

   ```bash
   nix develop
   ```

2. Otherwise, install pnpm:

   ```bash
   npm install -g pnpm
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Google OAuth credentials:
     ```
     GOOGLE_CLIENT_ID=your_client_id_here
     GOOGLE_CLIENT_SECRET=your_client_secret_here
     DATABASE_URL=your_neon_database_url_here
     ```

5. Run the development server:

   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## App Architecture Overview

### Project Structure
#### Backend (`/src/backend`)
- **Repositories**: Handle direct database interactions
  - Examples: accountsRepository.ts, usersRepository.ts, profilesRepository.ts
- **Services**: Implement business logic and orchestrate repository calls
  - Examples: authenticationService.ts, tokenService.ts

#### Frontend (`/src/modules`)
- Organized by features (e.g., authentication, emails)
- Each module typically includes:
  - `.action.ts`: Server actions for database operations
  - `.schema.ts`: Zod schemas for form validation
  - `.form.tsx`: React components for forms
  - Other related components and utilities

#### Routing (`/src/app`)
- Utilizes Next.js file-based routing
- API routes for third party integrations (e.g., Google OAuth)

#### Database Schema (`/src/database`)
- Defined using Drizzle ORM
- Includes tables for users, accounts, profiles, etc.