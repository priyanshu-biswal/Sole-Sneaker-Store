# Sole — Sneaker Store

A responsive sneaker storefront built with React, Vite, and Tailwind CSS. Browse the collection, add shoes to your bag, adjust quantities, and try the demo checkout.

> **Demo only:** Checkout does not process payments or create real orders. Do not enter real payment details.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
src/
  components/
    PaymentView.jsx  Demo checkout and order summary
    StoreView.jsx    Product catalog and shopping cart
  context/
    CartContext.jsx  Shared cart state and totals
  data/
    products.js     Store product catalog
  App.jsx            Storefront layout and view navigation
  main.jsx           React application entry point
  styles.css         Tailwind directives and global styles
index.html           Vite HTML entry point
```

Product details can be changed in `src/data/products.js`. The catalog uses remote Unsplash image URLs, so product photos require an internet connection.
