import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import mime from 'mime';
import { Transform } from 'stream';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
    case '/index.html':
      loadResource('index.html', getContentType(req.url), res);
      break;
    case '/contacts':
    case '/contacts.html':
      loadResource('contacts.html', getContentType(req.url), res);
      break;
    default:
      if (req.url.includes('/upload') && req.method === 'POST') {
        const fileName = req.url.split('/').at(-1).trim();
        const writeStream = fs.createWriteStream(`./dist/upload/${fileName}`);
        req.on('data', (chunk) => {

          writeStream.write(chunk);
        });

        req.on('error', (error) => {
          console.log(error)
        });

        req.on('end', () => {
          // writeStream.end();

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ data: 'data is writing' }));
          res.end();
        });
      } else {

        loadResource(req.url, getContentType(req.url), res);
      };

      break;
  };

  // if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST') {
  //   console.log(req.url)
  // };
});

function loadResource(url, contentType, res) {
  const pagePath = path.join(process.cwd(), 'dist', url);
  return fs.readFile(pagePath, (err, page) => {
    if (err) {
      res.writeHead(404);
      res.write('page not found');
      res.end();
    };

    res.writeHead(200, { 'Content-Type': contentType });
    res.write(page);
    return res.end();
  });
};

function getContentType(url) {
  switch (path.extname(url)) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      // return 'application/octate-stream';
      return mime.getType(url);
  };
};

server.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server started on PORT ${PORT}`);
});

