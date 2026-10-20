# Shop Frontend

## Project Overview

A responsive e-commerce web application built on top of the Shop API.

Features:
- User authentication with protected and public-only route guards.
- Product browsing with instant category, brand, and price range filtering.
- Wishlist with optimistic heart toggles and move-to-cart functionality.
- Shopping cart with quantity steppers, item removal, stock limits, and live total calculation.
- Light and dark theme toggle persisted in local storage.
- Responsive design with desktop navigation and mobile drawer menu.

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit & RTK Query
- React Router
- Tailwind CSS
- Ant Design (antd)

## Prerequisites

- Node.js >= 18 (recommended: Node 20 or 22)
- npm >= 9

### Running the Shop API

The mock backend runs on port 4000:

```bash
cd mock-api/mock-api
npm install
npm start
```

The API will be available at `http://localhost:4000`.

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd shop-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create the environment file:
```bash
cp .env.example .env
```
`VITE_API_URL` defines the base URL for the Shop API (defaults to `http://localhost:4000`).

4. Start the development server:
```bash
npm run dev
```

5. Available scripts:
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Type-checks and builds the production bundle in `dist/`.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs Oxlint checks across the codebase.

## Project Structure

- `src/app`: Redux store configuration and typed hooks (`useAppDispatch`, `useAppSelector`).
- `src/components`: Shared UI components, layout, header, footer, guards, and modals.
- `src/features`: Domain slices, custom hooks, storage handlers, and pure filter logic.
- `src/pages`: Route page components (`ProductsPage`, `CartPage`, `WishlistPage`, `LoginPage`, `RegisterPage`, `NotFoundPage`).
- `src/services`: RTK Query base API, injected endpoint slices, and normalized error handling.
- `src/types`: Shared TypeScript interfaces and API payload types.
- `src/utils`: Helper utility functions.

## Key Decisions

- RTK Query with injectEndpoints: Modular endpoints (auth, products, cart, wishlist) are injected into a single centralized API service.
- Optimistic updates and rollback: Cart mutations and wishlist toggles update UI cache immediately and revert with undo() on server error (except 409 conflict).
- 401 handling in baseQuery wrapper: A baseQuery wrapper intercepts 401 responses, dispatches logout once, and redirects to the login route.
- resetApiState on logout: Dispatches api.util.resetApiState() during logout to clear cached user data from memory.
- Client-side filters: Pure filter functions process product lists in memory for instant feedback without repeated network requests.
- Derived cart total: Computes order total dynamically from cart line items rather than relying on cached backend totals.
