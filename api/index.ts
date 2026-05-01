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
    logo: "https://playimdb.com/favicon.ico",
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
    url: string;
  }

  let streams: Stream[] = [];

  if (type === 'movie') {
    streams = [
      {
        title: "PlayIMDB - Vidsrc.to",
        url: `https://vidsrc.to/embed/movie/${cleanId}`
      },
      {
        title: "PlayIMDB - 2Embed",
        url: `https://www.2embed.cc/embed/${cleanId}`
      },
      {
        title: "PlayIMDB - Vidsrc.me",
        url: `https://vidsrc.me/embed/${cleanId}`
      }
    ];
  } else if (type === 'series') {
    const parts = cleanId.split(':');
    const imdbId = parts[0];
    const season = parts[1];
    const episode = parts[2];

    streams = [
      {
        title: "PlayIMDB - Vidsrc.to",
        url: `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode}`
      },
      {
        title: "PlayIMDB - 2Embed",
        url: `https://www.2embed.cc/embedvr/${imdbId}/${season}/${episode}`
      }
    ];
  }

  res.json({ streams });
});

// Vercel için app'i export ediyoruz
export default app;
