# Trust Care Electronics ⚡

Official website for **Trust Care Electronics** — Chennai's authorized sales, installation, and service center for Microtek Pure Sine Wave Inverters, Inverter Batteries, Two-Wheeler & Four-Wheeler Batteries, and Online UPS.

---

## 🚀 Features

- **Inverter Load & Battery Backup Calculator:** Interactive real-time calculator to estimate total appliance wattage, recommended inverter VA rating, and required battery Ah for desired backup duration.
- **Microtek Inverter Catalog:** Pure Sine Wave Inverters (Luxe 1050, Super Power 1250, Merlyn 1650, Heavy Duty 2200 24V) with specs, warranty, and pricing.
- **Automotive Battery Lineup:** 10 Two-Wheeler (Bike/Scooter) and 10 Four-Wheeler (Car/SUV) battery models with MRP, Instant Exchange Scrap Discount pricing, and vehicle compatibility list.
- **Sticky Glassmorphism Navigation:** Fixed top navbar with quick access to catalogs, WhatsApp consultation, and call buttons.
- **WhatsApp & Inquiry Modal:** Direct click-to-chat WhatsApp integration and quick booking modal linked to Google Sheets.
- **Vercel-Ready Architecture:** Edge-cached static assets, clean URLs without `.html`, and Serverless API configuration for dynamic environment variables.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Semantic HTML5, Vanilla CSS3 (Glassmorphism, CSS Grid & Flexbox), Vanilla JavaScript (ES6+).
- **Backend / API:**
  - **Local Development:** Express.js (`server.js`) serving static files and `/api/config`.
  - **Vercel Production:** Vercel Edge CDN for static assets (`/public`) + Vercel Serverless Function (`/api/config.js`).
- **Deployment:** Vercel with automated GitHub integration.

---

## 🌐 Deploying to Vercel (Step-by-Step)

### Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your code to GitHub** (already configured on `main` branch).
2. Go to [vercel.com](https://vercel.com) and log into your account.
3. Click **"Add New..."** → **"Project"**.
4. Import your GitHub repository: `trust-care-electronics`.
5. Under **Framework Preset**, select **Other** (or leave as auto-detected).
6. Expand **Environment Variables** and add the following 4 keys:

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `CONTACT_NUMBER` | `+919884087878` | Phone/WhatsApp number (with country code) |
| `DISPLAY_CONTACT_NUMBER` | `+91 9884087878` | Formatted phone number displayed in UI |
| `EMAIL_ADDRESS` | `trustcareelectronics@gmail.com` | Business support email address |
| `MAP_LOCATION_URL` | `https://maps.app.goo.gl/U5BKf7q1mpoMP46T9` | Google Maps location URL for the showroom |

7. Click **Deploy**. Vercel will automatically build the project and provide a live production URL!

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanjai022/trust-care-electronics.git
   cd trust-care-electronics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

5. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```text
trust-care-electronics/
├── .env.example          # Template for required environment variables
├── .gitignore            # Git exclusion rules (.env, .vercel, node_modules)
├── api/
│   └── config.js         # Vercel Serverless Function for /api/config
├── package.json          # Project metadata, dependencies, and scripts
├── public/               # Static web assets served by Vercel Edge CDN
│   ├── index.html        # Home page & Inverter Load Calculator
│   ├── battery.html      # Battery catalog (Inverter, 2-Wheeler, 4-Wheeler)
│   ├── inverter.html     # Microtek Pure Sine Wave inverter models
│   ├── ups.html          # Online UPS solutions
│   ├── about.html        # About Trust Care Electronics
│   ├── style.css         # Main stylesheet with glassmorphism & responsive rules
│   ├── script.js         # Calculator, inquiry modal, and dynamic config loader
│   └── images/           # All product and banner images
├── server.js             # Express server for local development and testing
├── vercel.json           # Vercel routing, cleanUrls, and cache headers
└── README.md             # Project documentation and deployment guide
```

---

## 🔒 Security & Privacy

- Sensitive environment variables are stored strictly in `.env` (excluded by `.gitignore`) and in the secure Vercel Dashboard.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`) are enabled via `vercel.json`.
