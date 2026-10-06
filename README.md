# Banking Portal Frontend

A modern Angular banking portal for managing customer accounts, transfers, transaction history, and administrative oversight.

## Overview

This frontend application provides a streamlined user experience for:

- customer authentication and role-based access
- account dashboard with balances and account details
- transaction history and activity review
- inter-account transfers
- recurring payment management
- administrator views for customers and account data

The app is built with Angular and communicates with a backend API running at `http://localhost:8080`.

## Tech Stack

- Angular 22
- TypeScript
- RxJS
- Angular CLI
- Vitest for testing

## Features

### Customer experience
- secure login flow with token-based authentication
- dashboard overview for available bank accounts
- transfer funds between accounts
- view recent transaction activity
- manage recurring payments

### Admin experience
- view customer records
- review account details across the system
- access restricted by admin guard

## Project Structure

```text
src/
├── app/
│   ├── admin/
│   ├── dashboard/
│   ├── guards/
│   ├── interceptors/
│   ├── login/
│   ├── recurring-payments/
│   ├── services/
│   ├── transactions/
│   ├── transfer/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   └── app.html
├── main.ts
├── styles.css
└── index.html
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 20 or newer
- npm 10 or newer
- the banking backend API running on `http://localhost:8080`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Then open:

```text
http://localhost:4200
```

The Angular dev server automatically reloads when source files change.

## Available Scripts

```bash
npm start       # runs ng serve
npm run build   # builds the production bundle
npm run watch   # builds in watch mode for development
npm run test    # runs the test suite
```

## Backend Integration

This frontend expects a backend service exposing the following routes:

- `POST /api/auth/login`
- `GET /api/accounts`
- `GET /api/transactions`
- `POST /api/transactions/transfer`
- `GET /api/admin/customers`
- `GET /api/admin/accounts`

The app stores the JWT token in `localStorage` and reads the role from the token payload to decide whether to redirect to the customer dashboard or admin page.

## Development Notes

- route protection is handled through Angular guards in `src/app/guards/`
- API logic is centralized in services under `src/app/services/`
- the app uses lazy-style route configuration through the Angular router

## License

This project is provided as a frontend application for the banking portal demo and is intended for local development and learning purposes.
