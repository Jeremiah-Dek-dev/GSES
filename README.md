GSES is a multi-platform e-commerce and services platform for electronic device repairs and sales. It provides a marketplace where users can browse and purchase electronics, book repair services, and manage their orders, while administrators manage inventory, orders, and customer interactions. The platform is built as a fork of the original j-deku/GSES repo.

### Stack
- **Language(s):** TypeScript (backend), JavaScript/JSX (frontend), TypeScript (SEO frontend)
- **Framework / runtime:** Node.js + Express (backend), React 19 with Vite (main SPA), Next.js 16 + App Router (SEO frontend)
- **Notable libraries:** Mongoose + MongoDB (data persistence), Redux Toolkit (frontend state management), Material-UI (component library), Passport.js (authentication), Paystack (payment processing), OpenAI (chatbot), Nodemailer (email notifications)

## How it's organized

```
backend/                TypeScript + Express API server
  src/
    server.ts           App initialization, middleware setup
    apis/               API route aggregation
    routes/             Domain-specific routes (Admin, User, Cart, Order, Bot, Design)
    controllers/        Request handlers
    services/           Business logic & transactional operations
    models/             MongoDB schemas via Mongoose
    middlewares/        CORS, security, logging, rate limiting, auth
    config/             Database, Passport strategy configuration
    utils/              Helper functions
    uploads/            File storage directory
    
gses/                   React + Vite SPA (main application)
  src/
    App.jsx             Route definitions, nested layouts
    admin/              Admin dashboard pages and components
    user/               User-facing pages (Home, Products, Bookings, Orders)
    shared/             Route guards, utilities
    providers/          Redux store setup
    API/                Axios client services

seo/                    Next.js 16 (standalone SEO-optimized landing)
  app/
    page.tsx            Homepage (currently template)
    layout.tsx          Root layout with metadata
```

**How it fits together:** Requests from the React SPA (gses/) and Next.js frontend (seo/) go to the Express backend at `/api`. The backend uses Passport for authentication (supporting Google OAuth), Mongoose for data persistence in MongoDB, and Paystack for payment processing. Admin and user routes are protected by guards. The backend serves static uploads at `/images` and logs requests via Winston. The SEO frontend is decoupled for search optimization.

## How to run it

**Backend:**
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000 (or process.env.PORT)
```

**React SPA (gses):**
```bash
cd gses
npm install
npm run dev
# Vite dev server runs on http://localhost:5173 (default)
```

**Next.js frontend (seo):**
```bash
cd seo
npm install
npm run dev
# Next.js dev server runs on http://localhost:3000
```

**Environment variables** (backend): `PORT`, `SESSION_SECRET`, `NODE_ENV`, MongoDB connection URI, Google OAuth credentials, Paystack API keys, OpenAI API key, email service config.

## Try asking

- "What are the admin vs. user protected routes in the React app?"
- "How does the backend handle payments via Paystack?"
- "What MongoDB models are defined for products, orders, and users?"
