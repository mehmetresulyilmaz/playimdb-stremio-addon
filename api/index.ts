import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const APP_NAME = "PlayIMDB Addon";
const APP_ID = "org.playimdb.stremio";

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

// Vercel için app'i export ediyoruz
export default app;
