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
    description: "Direct stream links to PlayIMDB for movies",
    resources: ["stream"],
    types: ["movie"],
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
  // IMDb ID'yi tam olarak al (örn: tt1234567.json -> tt1234567)
  const cleanId = id.split('.')[0];
  
  interface Stream {
    title: string;
    url?: string;
    externalUrl?: string;
  }

  let streams: Stream[] = [];

  if (type === 'movie' && cleanId.startsWith('tt')) {
    streams = [
      {
        title: "🎬 WATCH ON PLAYIMDB",
        externalUrl: `https://www.playimdb.com/title/${cleanId}`
      }
    ];
  }

  res.json({ streams });
});

// Vercel için app'i export ediyoruz
export default app;
