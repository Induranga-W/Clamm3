# [QR] QR Code Generator

A fast, minimal QR code generator built with **Next.js 16** and **TypeScript** — no tracking, no third-party APIs, no limits.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- **6 content types** — URL, Email, Phone, SMS, Wi-Fi, Plain Text
- **6 color schemes** — Classic, Ocean, Violet, Forest, Ember, Inverted
- **Adjustable size** — 128px to 600px
- **Error correction levels** — L / M / Q / H
- **Download as PNG** or **copy to clipboard** in one click
- Live preview — regenerates instantly on every change
- Fully client-side — nothing leaves your browser

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [qrcode](https://www.npmjs.com/package/qrcode) | QR code generation |
| [DM Sans + DM Mono](https://fonts.google.com/) | Typography |

---

## 📁 Project Structure

```
app/
├── page.tsx        # Main QR generator page
├── globals.css     # All styles (qr- prefixed)
└── layout.tsx      # Root layout
qrcode.d.ts         # Type declarations for qrcode module
```

---

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

MIT — feel free to use, modify, and distribute.
