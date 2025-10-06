// server.js
const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers (relaxed for in-browser libs, 3Dmol, RDKit, etc.)
app.use(
  helmet({
    contentSecurityPolicy: false, // your app pulls from various CDNs
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  })
);

// Gzip / brotli (where supported)
app.use(compression());

// Health check for Render
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

// Serve static SPA
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir, { maxAge: "1d", extensions: ["html"] }));

// Single-page fallback
app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));

app.listen(PORT, () => {
  console.log(`PharmaSim Pro running at http://localhost:${PORT}`);
});
