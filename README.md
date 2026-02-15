# SwissPack Studio

Minimaler Website-Boilerplate (Next.js + React + Three.js + Express) mit:

- Startseite (`/`)
- Produktliste mit Filter (`/produkte`)
- Produktdetail mit 3D-Viewer + Offert-Form (`/produkte/[slug]`)
- Kontakt & Preisanfrage (`/kontakt`)
- Dedizierter 3D-Viewer (`/viewer`)

## Stack

- Next.js (Pages Router)
- React
- Three.js via `@react-three/fiber` + `@react-three/drei`
- Node/Express (`server.js`)

## Lokaler Start

```bash
npm install
npm run dev
```

App unter `http://localhost:3000`.

## Optional: Start mit Express-Server

```bash
npm run dev:express
```

## Production

```bash
npm run build
npm run start
```

Oder mit Express:

```bash
npm run start:express
```

## CMS-ready Umgebungsvariablen

Lege `.env.local` an:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CMS_PROVIDER=local

CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=

STRAPI_URL=
STRAPI_API_TOKEN=
```

## 3D Assets

Lege Dateien in `public/models` ab und setze `modelUrl` in `src/lib/products.js`, z. B.:

- `/models/cup.glb`
- `/models/box.gltf`

## Dateien

- `index.html`, `app.js`, `styles.css` sind eine einfache statische Vorschau.
- Die produktive App laeuft ueber Next.js/React.
