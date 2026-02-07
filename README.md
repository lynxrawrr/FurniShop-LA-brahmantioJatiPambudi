# FurniShop - Mini Project Lumoshive Academy

Landing page website furniture berbasis **React (Hooks)** dengan data dinamis dari **Furniture API**. Project ini mengikuti desain Figma (layout, warna, tipografi, komponen) dan menekankan **responsivitas**, **UX**, **SEO**, **aksesibilitas**, serta **basic security** (validasi + sanitasi input).

---

## Live Demo
https://furnishop-la.vercel.app/

---

## Tech Stack
- **React 19** 
- **Vite**
- **Tailwind CSS v4**
- **React Router DOM**
- **react-icons**
- **tailwindcss-animate**

---

## Fitur Utama
### UI / UX
- Landing page sections: **Hero**, **Stats**, **About**, **New In Store (Categories)**, **Best Manufacturer**, **All Products**, **Testimonials**, **Newsletter**
- **Smooth scroll** tombol “Shop Now” ke section produk
- **Loading state** + skeleton (Hero/Product cards)
- **Toast notification** (contoh: Add to cart)
- **Modal detail produk** (ProductDetailModal)
- **Pagination** untuk daftar produk (mode normal)

### Data & API
- HTTP client: `src/lib/http/http.js`
- Data diambil dari beberapa endpoint (header, categories, stats, products, testimonials, subscribe)
- Produk:
  - Mode normal: **paginate** via `useProducts()`
  - Mode search: load semua produk via `useAllProducts()` lalu filter client-side

### Security
- **Sanitasi input**: `sanitizeText()`, `sanitizeEmail()`
- **Validasi email**: `isEmail()`
- Tidak menggunakan `dangerouslySetInnerHTML`
- Tidak menyimpan data sensitif di client

### SEO + Semantic HTML
- `index.html` berisi `<title>`, meta description, canonical, OG/Twitter meta
- Struktur heading & section terorganisir (main/section/article)

### Aksesibilitas
- Label input menggunakan `sr-only`
- `aria-live` untuk feedback subscribe
- Mobile Responsive

---

## Struktur Project
``` text
furnishop/
|_ public/
|  |_ favicon.svg
|
|_ src/
|  |_ app/
|  |  |_ App.jsx
|  |  |_ main.jsx
|  |
|  |_ assets/
|  |  |_ gallery/
|  |     |_ chair.png
|  |     |_ kitchen.png
|  |     |_ living.png
|  |     |_ newsletter.png
|  |
|  |_ components/
|  |  |_ layout/
|  |     |_ Container.jsx
|  |     |_ Footer.jsx
|  |     |_ MobileMenu.jsx
|  |     |_ Navbar.jsx
|  |     |_ Toast.jsx
|  |
|  |_ features/
|  |  |_ home/
|  |  |  |_ HomePage.jsx
|  |  |  |_ api/
|  |  |  |  |_ categories.api.js
|  |  |  |  |_ header.api.js
|  |  |  |  |_ stats.api.js
|  |  |  |_ hooks/
|  |  |  |  |_ useCategories.js
|  |  |  |  |_ useHeader.js
|  |  |  |  |_ useStats.js
|  |  |  |_ sections/
|  |  |     |_ AboutSection.jsx
|  |  |     |_ BestManufacturerSection.jsx
|  |  |     |_ HeroSection.jsx
|  |  |     |_ NewInStoreSection.jsx
|  |  |     |_ NewsletterSection.jsx
|  |  |     |_ ProductsSection.jsx
|  |  |     |_ StatsSection.jsx
|  |  |     |_ TestimonialsSection.jsx
|  |  |
|  |  |_ products/
|  |  |  |_ api/
|  |  |  |  |_ products.api.js
|  |  |  |_ components/
|  |  |  |  |_ Pagination.jsx
|  |  |  |  |_ ProductCard.jsx
|  |  |  |  |_ ProductCardSkeleton.jsx
|  |  |  |  |_ ProductDetailModal.jsx
|  |  |  |  |_ ProductGrid.jsx
|  |  |  |_ hooks/
|  |  |     |_ useAllProducts.js
|  |  |     |_ useDebouncedValue.js
|  |  |     |_ useProducts.js
|  |  |
|  |  |_ subscribe/
|  |  |  |_ api/
|  |  |  |  |_ subscribe.api.js
|  |  |  |_ components/
|  |  |  |  |_ SubscribeForm.jsx
|  |  |  |_ hooks/
|  |  |     |_ useSubscribe.js
|  |  |
|  |  |_ testimonials/
|  |     |_ api/
|  |     |  |_ testimonials.api.js
|  |     |_ components/
|  |     |  |_ TestimonialCard.jsx
|  |     |  |_ TestimonialControls.jsx
|  |     |_ hooks/
|  |        |_ useTestimonials.js
|  |
|  |_ lib/
|  |  |_ config/
|  |  |  |_ env.js
|  |  |_ http/
|  |     |_ http.js
|  |
|  |_ pages/
|  |  |_ NotFound.jsx
|  |
|  |_ styles/
|  |  |_ global.css
|  |
|  |_ utils/
|     |_ format.js
|     |_ sanitize.js
|     |_ useHideOnScroll.js
|     |_ validate.js
|
|_ .env
|_ .gitignore
|_ eslint.config.js
|_ index.html
|_ package-lock.json
|_ package.json
|_ README.md
|_ vite.config.js
```

---
## Instalasi & Menjalankan Project
### 1) Clone Repository
``` bash
git clone https:
cd furnishop
```

### 2) Setup Environment
Buat file `.env` di root:

```env
VITE_API_BASE_URL=https://lumoshive-api-furniture.vercel.app
```

### 3) Install dependencies dan jalankan development server
```bash
npm install
npm run dev
```

---
## Routes
- `/` : HomePage
- `/*` : Not Found

---

## Referensi
- **API:** https://documenter.getpostman.com/view/12255985/2sB34eH2J8
- **Figma:** https://www.figma.com/design/NDv3b1lHLCKBEvRcFwn9hU/Landing-Page---Furniture-Website--Community-?node-id=1-78&t=80pCe7bzZ4YcT7E1-1
- **Tailwind V4 Docs:** https://tailwindcss.com/docs/
- **React Icon:** https://react-icons.github.io/react-icons/
- **Tailwind CSS Animate:** https://github.com/jamiebuilds/tailwindcss-animate

