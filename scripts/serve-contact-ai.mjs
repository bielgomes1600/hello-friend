import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import contactAPI from '../api/leads/contacts/chat.js';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 5174);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
await stat(resolve(root, 'index.html')).catch(() => { throw new Error('Execute o build antes de iniciar o servidor de testes.'); });
const server = createServer(async (req, res) => {
  const controller = new AbortController();
  res.on('close', () => { if (!res.writableEnded) controller.abort(); });
  try {
    const url = new URL(req.url, 'http://' + (req.headers.host || '127.0.0.1:' + port));
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) { res.writeHead(400); res.end(); return; }
    if (url.pathname === '/api/leads/contacts/chat') {
      const request = new Request(url, { method: req.method, headers: req.headers, signal: controller.signal,
        ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: Readable.toWeb(req), duplex: 'half' } : {}) });
      const response = await contactAPI.fetch(request);
      if (res.destroyed) return;
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith('/api/')) { res.writeHead(404); res.end(); return; }
    const relative = ['/', '/login', '/dashboard'].includes(pathname) ? 'index.html' : pathname.replace(/^\/+/, '');
    if (relative.split('/').some(part => part.startsWith('.')) || relative.includes('\0')) { res.writeHead(404); res.end(); return; }
    const path = resolve(root, relative);
    if (!path.startsWith(resolve(root) + sep)) { res.writeHead(404); res.end(); return; }
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    if (!res.headersSent) res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Recurso não disponível.');
  }
});
server.requestTimeout = 30000;
server.headersTimeout = 10000;
server.listen(port, '127.0.0.1', () => console.log('WebNova + API de testes: http://127.0.0.1:' + port));
