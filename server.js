// Local preview server only. The site itself is static and needs no server in production.
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 4310;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    // Mirror Vercel's cleanUrls: /about serves about.html
    else if (!path.extname(urlPath)) urlPath += ".html";
    const file = path.normalize(path.join(root, urlPath));
    if (!file.startsWith(root) || path.basename(file) === "server.js") {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        fs.readFile(path.join(root, "404.html"), (e, page) => {
          res.writeHead(404, { "Content-Type": types[".html"] }).end(page || "Not found");
        });
        return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" }).end(data);
    });
  })
  .listen(port, () => console.log(`Excel Guarding preview on http://localhost:${port}`));
