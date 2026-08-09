import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const APP_NAME = "IMDb.su Addon";
const APP_ID = "org.playimdb.stremio";

const handleManifest = (req: express.Request, res: express.Response) => {
  const isConfigured = req.query.configured === 'true';
  res.setHeader('Content-Type', 'application/json');
  return res.json({
    id: APP_ID,
    version: "1.0.0",
    name: APP_NAME,
    description: "Direct stream links to IMDb.su for movies (PLEASE USE AD BLOCKER)",
    resources: ["stream"],
    types: ["movie"],
    idPrefixes: ["tt"],
    catalogs: [],
    logo: "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png",
    stremioAddonsConfig: {
      issuer: "https://stremio-addons.net",
      signature: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..TJI6QIQWPdkpI66ELyzYMw.or85NgK-FVhyRkkNtCBWXzdAs4X5RWxJOEq_Ubw9C9wpBsVmNHkHTXKJx5WATaNuZSd6Op1Aju7iyXhBg9YvCTNNiR96qcc4Y3ybfQ7fviy7xC_Bmm0DzyjmAJAZ2L_H.nFyJXD2Rr9pQkI2mfAzQ9g"
    },
    behaviorHints: {
      configurable: true,
      configurationRequired: !isConfigured
    }
  });
};

const handleStream = (typeParam: string, idParam: string, res: express.Response) => {
  const cleanId = idParam ? idParam.split('.')[0] : '';
  
  interface Stream {
    title: string;
    url?: string;
    externalUrl?: string;
  }

  let streams: Stream[] = [];

  if ((typeParam === 'movie' || !typeParam) && cleanId.startsWith('tt')) {
    streams = [
      {
        title: "🎬 Watch On IMDb.su",
        externalUrl: `https://www.imdb.su/title/${cleanId}`
      }
    ];
  }

  res.setHeader('Content-Type', 'application/json');
  return res.json({ streams });
};

// Route matches
app.get(['/manifest.json', '/api/manifest.json'], (req, res) => handleManifest(req, res));

app.get(['/stream/:type/:id', '/stream/:type/:id.json', '/api/stream/:type/:id'], (req, res) => {
  handleStream(req.params.type, req.params.id, res);
});

// Fallback logic for Vercel rewrites where req.url might be /api/index or /
app.use((req, res) => {
  const url = req.url || req.path || '';
  if (url.includes('/stream/')) {
    const parts = url.split('/stream/')[1]?.split('/') || [];
    const type = parts[0] || 'movie';
    const id = parts[1] || '';
    return handleStream(type, id, res);
  }
  return handleManifest(req, res);
});

export default app;
