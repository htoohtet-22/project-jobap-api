# Jobap Backend

NestJS + Prisma + NeonDB (Postgres) API for tracking job applications, with JWT auth and Swagger docs.

## Stack
- NestJS 12
- Prisma ORM 7 → NeonDB (Postgres)
- Passport JWT auth
- Swagger (`@nestjs/swagger`) at `/docs`

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a NeonDB project**
   - Go to https://neon.tech, create a project + database.
   - Copy the pooled connection string.

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Fill in `DATABASE_URL` with your Neon connection string and set a strong `JWT_SECRET`.

4. **Run the first migration** (creates tables in Neon and generates the Prisma client)
   ```bash
   npm run prisma:migrate -- --name init
   ```

5. **Start the dev server**
   ```bash
   npm run start:dev
   ```
   - API: http://localhost:3001
   - Swagger docs: http://localhost:3001/docs