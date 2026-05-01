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
    description: "Direct stream links to PlayIMDB for movies )PLEASE USE AD BLOCKER)",
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
        title: "🎬 Watch On Playimdb",
        externalUrl: `https://www.playimdb.com/title/${cleanId}`
      }
    ];
  }

  res.json({ streams });
});

// Vercel için app'i export ediyoruz
export default app;
