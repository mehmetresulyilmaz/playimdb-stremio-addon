# PlayIMDB Stremio Addon

Direct stream links based on IMDb IDs, bringing the PlayIMDB experience directly into your Stremio client.

## 🚀 Features

- **Direct IMDb Mapping**: Works with standard `tt0000000` identifiers.
- **Multiple Providers**: Routes through high-quality stream aggregators (Vidsrc, 2Embed, etc.).
- **Zero Config**: No registration or setup required.
- **Vercel Optimized**: Ready for deployment as a serverless function.

## 🛠 Installation

### Method 1: Direct Install
1. Open the [App Interface](https://playimdb-stremio-addon.vercel.app).
2. Click the **"INSTALL ADDON"** button.
3. Stremio will open automatically and prompt for installation.

### Method 2: Manual Link
1. Copy this manifest URL: `https://playimdb-stremio-addon.vercel.app/manifest.json`
2. Open Stremio.
3. Go to **Add-ons** (puzzle icon).
4. Paste the URL into the search bar at the top right.
5. Click **Install**.

## 💻 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Express (Node.js)
- **Deployment**: Vercel compatible (using `/api` directory)

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📄 License

This project is for educational purposes. It is not affiliated with IMDb.com. Stream links are provided by third-party services.
