import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_NAME = "PlayIMDB Addon";
const APP_ID = "org.playimdb.stremio";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());

  // Stremio Manifest
  app.get('/manifest.json', (req, res) => {
    res.json({
      id: APP_ID,
      version: "1.0.0",
      name: APP_NAME,
      description: "Direct stream links based on IMDb IDs (PlayIMDB style)",
      resources: ["stream"],
      types: ["movie", "series"],
      idPrefixes: ["tt"],
      catalogs: [],
      logo: "https://fuzulimedya.netlify.app/favicon.ico",
      behaviorHints: {
        configurable: false,
        configurationRequired: false
      }
    });
  });

  // Stremio Streams
  app.get('/stream/:type/:id.json', (req, res) => {
    const { type, id } = req.params;
    const cleanId = id.replace('.json', '');
    
    interface Stream {
      title: string;
      url?: string;
      externalUrl?: string;
    }

    let streams: Stream[] = [];

    if (type === 'movie') {
      streams = [
        {
          title: "🎬 WATCH ON PLAYIMDB",
          externalUrl: `https://www.playimdb.com/title/${cleanId}`
        }
      ];
    } else if (type === 'series') {
      const parts = cleanId.split(':');
      const imdbId = parts[0];
      streams = [
        {
          title: "🎬 WATCH ON PLAYIMDB",
          externalUrl: `https://www.playimdb.com/title/${imdbId}`
        }
      ];
    }

    res.json({ streams });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[STREMIO] ${APP_NAME} running at http://localhost:${PORT}`);
    console.log(`[STREMIO] Manifest: http://localhost:${PORT}/manifest.json`);
  });
}

startServer();
