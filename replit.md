# Ovex Pack Online Shop

## Overview
An online shop for custom-branded takeaway packaging with 3D product customization. Built with React + Express + PostgreSQL + Three.js.

## Architecture
- **Frontend**: React with TanStack Query, wouter routing, shadcn/ui components
- **Backend**: Express.js with session-based cart management
- **Database**: PostgreSQL with Drizzle ORM
- **3D**: React Three Fiber + Drei for 3D product configurator
- **Styling**: Tailwind CSS with teal primary theme (HSL 172)

## Key Pages
- `/` - Home (hero, categories, features, testimonials, CTA)
- `/produkte` - Products listing with filters (search, category, material)
- `/produkt/:slug` - Product detail with size selection, cart, and 3D configurator
- `/konfigurator` - Standalone 3D configurator (choose product type, upload logo, change color)
- `/warenkorb` - Shopping cart with quantity management
- `/ueber-uns` - About page
- `/kontakt` - Contact form

## 3D Configurator Features
- Logo upload (PNG, JPG, SVG) with live 3D preview
- Color customization with presets + custom color picker
- Custom text overlay
- Multiple product types: Cup, Bag, Box
- Interactive 3D rotation and zoom via OrbitControls

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
- 2026-02-12: Changed color scheme from indigo/violet to teal (HSL 172) - premium packaging look
- 2026-02-12: Updated hero tagline to "Verpackungen, die Eindruck hinterlassen"
- 2026-02-12: Rebranded from Limepack to Ovex Pack
- 2026-02-12: Added 3D product configurator with logo upload, color customization, and text overlay
- 2026-02-12: Initial MVP build with full product catalog, cart system, and seed data
