// server.js
const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve STATIC from the REPO ROOT (where your index.html is)
const publicDir = __dirname; // ⬅ change from path.join(__dirname, "public")
console.log("[boot] Serving static from:", publicDir);

app.use(compression());

app.get("/healthz", (_req, res) => res.type("text/plain").send("ok"));

// Serve files; add "html" extension fallback (so "/" serves index.html)
app.use(express.static(publicDir, { extensions: ["html"], maxAge: "1d" }));

// Root and SPA fallback
app.get("/", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));
app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));

app.listen(PORT, () => console.log(`[boot] Listening on :${PORT}`));
