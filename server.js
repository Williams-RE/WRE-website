import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Manually recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Add CSP headers (make sure no bad actors are injecting scripts.)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://wre-server-production.up.railway.app https://us.i.posthog.com https://us-assets.i.posthog.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' https://res.cloudinary.com https://wre-server-production.up.railway.app; " +
      "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; " +
      "media-src 'self' https://res.cloudinary.com; " +
      "connect-src 'self' https://wre-server-production.up.railway.app https://us.i.posthog.com; " +
      "frame-ancestors 'none'; " +
      "report-uri /csp-violation-report-endpoint/",
  );
  next();
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Handle React routing, return all requests to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/csp-violation-report-endpoint/", express.json(), (req, res) => {
  console.log("CSP Violation:", req.body);
  res.status(204).end();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
