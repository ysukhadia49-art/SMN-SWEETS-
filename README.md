# Sukhadiya Manilal Nathalal — Premium Mithai & Farsan Storefront

> **Location:** Shop No. 12, Near Choksi Bazar, Manek Chowk, Khadia, Ahmedabad, Gujarat 380001, India  
> **Heritage:** Established 1948 • 100% Pure Desi Ghee • Traditional Gujarati Halwai Craftsmanship  
> **UI Theme:** Cream (`#FFF8ED`) × Signature Orange (`#F97316` / `#EA580C`)  
> **Design Direction:** Modern, editorial, minimal — zero AI slop, zero SaaS clutter.

---

## 1. Project Transformation & Objective

All loyalty and rewards functionality has been **completely removed**:
- ❌ No digital stamp cards or points collection
- ❌ No customer loyalty QR codes or scanner
- ❌ No reward unlocks or redemptions
- ❌ No loyalty campaigns or transaction history
- ❌ No reward notifications or loyalty analytics

The platform is transformed into a **premium digital storefront & enquiry engine** showcasing authentic sweets, traditional Gujarati farsan, celebratory gift boxes, and bulk orders for weddings, festivals, and family celebrations.

---

## 2. Website Navigation & Structure

### Customer Storefront
1. **Home (`/`)**: Editorial hero ("Tradition in Every Bite."), Featured Sweets, Traditional Farsan, Signature Gift Boxes, Festival Specials, Seven Decades of Heritage story, and Visit Our Shop card.
2. **Our Sweets (`#sweets`)**: Categorized browsing (All, Traditional Mithai, Laddoo Specials, Barfi & Katli, Peda, Jalebi & Fresh, Dry Fruit Sweets) with verified pricing and "Price on Enquiry" fallbacks.
3. **Farsan (`#farsan`)**: Authentic Gujarati savouries (Bhavnagari Gathiya, Vanela Gathiya, Fafda, Bhakarwadi, Nylon Khaman, Chevdo) with fresh morning frying notices.
4. **Gift Boxes (`#gift-boxes`)**: Royal hampers, Shagun wedding boxes, corporate celebration gifts with custom curation.
5. **Bulk Orders (`#bulk-orders`)**: Dedicated wedding and event enquiry workflow with automatic reference ID generation (e.g. `SMN-BULK-XXXX`), WhatsApp follow-up, and online enquiry tracker.
6. **About Us (`#about`)**: Heritage story of Sukhadiya Manilal Nathalal, four pillars of purity (Pure A2 Desi Ghee, Wood & Flame Roasting, No Artificial Additives).
7. **Contact (`#contact`)**: Manek Chowk physical address, Google Maps direct route, verified WhatsApp desk, calling number, and shop timings.

### Shop Admin Dashboard (`#admin`)
1. **Overview**: Live database-derived KPIs (Total Catalogue Products, Active Categories, New Bulk Enquiries, Pending Enquiries, Confirmed Orders), recent enquiry actions.
2. **Products**: Complete catalogue management (Add, edit, delete, availability toggles, verified price vs price on enquiry, package sizes, allergen & storage info).
3. **Categories**: Create, edit, and reorder categories with item count safety guards.
4. **Bulk Enquiries**: Full status lifecycle pipeline (`New` → `Contacted` → `Quotation Pending` → `Quotation Shared` → `Confirmed` → `Completed` / `Cancelled`), staff notes, and direct WhatsApp replies.
5. **Customers / Contacts**: Aggregated directory of contacts captured from enquiries with enquiry count and occasion history.
6. **Analytics**: Real business metrics (Enquiry distribution by occasion, pipeline health, conversion rate, CSV report export).
7. **Shop Settings**: Verified WhatsApp number configuration, Manek Chowk address, Google Maps URL, opening hours, and factory reset option.

---

## 3. Cream & Orange Design Tokens

| Element | Color Hex | Usage |
|---|---|---|
| Main Background | `#FFF8ED` | Page background |
| Secondary Cream | `#FFF1DC` | Section alternating backgrounds, hero tint |
| Primary Orange | `#F97316` | Main brand buttons, badges, highlights |
| Deep Orange | `#EA580C` | Primary headings, button hover, prices |
| Card Surface | `#FFFEFA` | Product cards, form containers, modals |
| Main Text | `#332218` | Primary headings & high-contrast body text |
| Secondary Text | `#806656` | Descriptive paragraphs, subtitles, metadata |
| Borders | `#EEDCCA` | Clean subtle borders, dividers, inputs |

---

## 4. Local Development & Verification

### Prerequisites
- Node.js `v18+` or `v20+`
- npm

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Run Automated Test Suite
```bash
npx vitest run
```

### Production Build
```bash
npm run build
```

---

## 5. Recommended Active Workspace

To set this project as your active workspace in Antigravity IDE:
- Open folder: `C:\Users\yug sukhadia\.gemini\antigravity-ide\scratch\sukhadiya-mithai`
