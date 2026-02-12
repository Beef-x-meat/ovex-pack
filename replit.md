# Limepack Online Shop

## Overview
An online shop for custom-branded takeaway packaging inspired by limepack.ch. Built with React + Express + PostgreSQL.

## Architecture
- **Frontend**: React with TanStack Query, wouter routing, shadcn/ui components
- **Backend**: Express.js with session-based cart management
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with lime-green primary theme

## Key Pages
- `/` - Home (hero, categories, features, testimonials, CTA)
- `/produkte` - Products listing with filters (search, category, material)
- `/produkt/:slug` - Product detail with size selection and cart
- `/warenkorb` - Shopping cart with quantity management
- `/ueber-uns` - About page
- `/kontakt` - Contact form

## Data Models
- `categories` - Product categories (id, name, slug, description, imageUrl)
- `products` - Products (id, name, slug, description, categoryId, basePrice, sizes[], eco, featured)
- `cart_items` - Cart items (id, sessionId, productId, quantity, size)

## API Routes
- `GET /api/categories` - All categories
- `GET /api/products` - All products
- `GET /api/products/featured` - Featured products
- `GET /api/products/:slug` - Product by slug
- `GET /api/cart` - Cart items (session-based)
- `POST /api/cart` - Add to cart
- `PATCH /api/cart/:id` - Update cart quantity
- `DELETE /api/cart/:id` - Remove from cart

## Recent Changes
- 2026-02-12: Initial MVP build with full product catalog, cart system, and seed data
