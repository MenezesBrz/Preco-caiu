# 📉 O Preço Caiu - Deals & WhatsApp Community Landing Page

A modern, high-performance, and cybersecurity-hardened landing page designed for e-commerce deals, coupons, and price-drop alert communities on WhatsApp and Telegram.

> **Target Audience:** The end-user interface is localized in Brazilian Portuguese (`pt-BR`) for maximal market conversion, while the codebase, architecture, configuration files, and documentation follow international English standards for engineering evaluations and open-source collaboration.

---

## 🔒 Implemented Cybersecurity Architecture (Defense-in-Depth)

Although the frontend is client-side rendered without a direct database connection, comprehensive multi-layered security controls have been implemented to protect against client and server-side threat vectors:

### 1. SQL Injection (SQLi) Defense
- **Server-Level Firewall (`.htaccess`)**: Active ModRewrite rules inspect request strings and block any attempt containing SQL keywords (`UNION`, `SELECT`, `INSERT`, `DROP`, `UPDATE`, `--`, `INFORMATION_SCHEMA`, etc.), terminating malicious probes with an immediate **HTTP 403 Forbidden**.
- **Client-Level Audit (`security.js`)**: Real-time scanner analyzes `window.location.search` and `window.location.hash` on document initialization. Any injected SQL payload is stripped, sanitized, and removed from the browser history state without execution.

### 2. XSS & JavaScript Injection Prevention
- **HTML Sanitization (`SecurityUtils.escapeHTML`)**: All dynamic content passes through an entity encoder before DOM insertion, mitigating Reflected, Stored, and DOM-based XSS attacks.
- **Strict URL Scheme Whitelisting (`SecurityUtils.sanitizeWhatsAppUrl`)**: Destination URLs are validated against permitted HTTPS WhatsApp schemes (`https://chat.whatsapp.com/`, `https://wa.me/`). Potentially malicious protocols (`javascript:`, `data:`, `vbscript:`, `file:`) are strictly rejected and neutralized.
- **Hardened Content Security Policy (CSP)**: Declared via both HTTP headers and `<meta>` tags to restrict script origins, disallow inline execution of unauthorized resources, and block `<object>`, `<embed>`, or `<base>` hijacking.

### 3. Anti-Clickjacking & UI Redressing
- **HTTP Header**: `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`.
- **Active Frame-Busting (`security.js`)**: Executes an inline DOM check to guarantee that if the page is loaded inside an unauthorized third-party `<iframe>` (phishing attempts), it breaks out to top-level navigation or hides rendered content.

### 4. Prototype Pollution & State Tampering Prevention
- **Deep Object Freezing (`Object.freeze`)**: Core runtime objects in `config.js` and `SecurityUtils` are made immutable, preventing third-party extension scripts or runtime prototype modifications from altering group links or redirection destinations.

### 5. Transport & Context Security
- **Strict HTTPS Enforcement (HSTS)**: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
- **MIME Sniffing Protection**: `X-Content-Type-Options: nosniff`.
- **Referrer Privacy**: `Referrer-Policy: strict-origin-when-cross-origin` paired with `rel="noopener noreferrer"` across all external outbound anchors to prevent reverse tabnabbing and token leakage.
- **Hardware Privacy**: `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`.
- **Directory Browsing Disabled**: `Options -Indexes` prevents automated directory scanning.

---

## 📁 Repository Structure

```
o-preco-caiu/
│
├── index.html              # Core HTML structure (SEO metadata, 12 group rows, security tags)
├── .htaccess               # Apache/LiteSpeed/cPanel security firewall rules
├── vercel.json             # Edge headers configuration for Vercel deployment
├── README.md               # Architecture, setup, and security documentation
│
└── assets/
    ├── css/
    │   └── style.css       # Clean, responsive CSS stylesheet (variables, animations, mobile layout)
    ├── js/
    │   ├── security.js     # Cybersecurity module (anti-XSS, anti-SQLi audit, frame-busting)
    │   ├── config.js       # Centralized configuration (group URLs, recent deals ticker)
    │   └── main.js         # DOM management, ticker animation, and FAQ accordion
    └── img/
        ├── logo.png        # Official brand logo (yellow, red, black 1:1 badge)
        └── *.webp / *.jpg  # Optimized category thumbnail assets
```

---

## ⚙️ Configuration & Group Links

Group destinations can be edited directly inside:

👉 **`index.html`** (Static fallback anchors)  
👉 **`assets/js/config.js`** (Centralized JS configuration)

### Example configuration block in `assets/js/config.js`:
```javascript
{
  id: "smartphones",
  name: "Smartphone & iPhone",
  description: "Celulares com super desconto",
  image: "assets/img/smartphone-e-iphone.webp",
  fallbackEmoji: "📱",
  whatsappUrl: "https://chat.whatsapp.com/YOUR_GROUP_INVITE_CODE"
}
```

When a visitor clicks "Entrar" (or anywhere on the corresponding row), the link securely opens the official WhatsApp invitation in a isolated tab (`target="_blank" rel="noopener noreferrer"`).

---

## 🚀 Deployment Instructions

The project is zero-dependency vanilla web technology (HTML5, CSS3, ES6+ JavaScript), making it compatible with any hosting provider:

1. **Vercel / Netlify (Recommended)**:
   - Connect your GitHub repository or drag-and-drop the directory into the provider's dashboard.
   - The provided `vercel.json` automatically supplies edge security headers.
2. **Traditional Web Hosting (Apache / cPanel / LiteSpeed)**:
   - Upload the files directly to your web root (`public_html`).
   - The included `.htaccess` file activates all firewall and security rules immediately.
3. **GitHub Pages / Cloudflare Pages**:
   - Push to a `main` or `gh-pages` branch. Enable Pages in repository settings.
  

⚠️MADE WITH AI⚠️
