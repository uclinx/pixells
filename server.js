// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "changeme";

const app = express();
app.use(express.json({ limit: '1mb' }));

const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

const clients = new Set();

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');
  if (token !== AUTH_TOKEN) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }
  wss.handleUpgrade(req, socket, head, (ws) => {
    clients.add(ws);
    ws.on('close', () => clients.delete(ws));
    ws.send(JSON.stringify({ ok: true, msg: 'connected' }));
  });
});

app.get('/health', (req, res) => res.json({ ok: true, clients: clients.size }));

app.post('/ids', (req, res) => {
  const auth = (req.headers.authorization || '').split(' ')[1];
  if (auth !== AUTH_TOKEN) return res.status(403).json({ ok:false, error:'invalid token' });
  const body = req.body || {};
  const ids = Array.isArray(body.ids) ? body.ids : (body.id ? [body.id] : []);
  if (!ids.length) return res.status(400).json({ ok:false, error:'no ids' });
  const payload = { type:'ids', ids, source: body.source || 'pixells', ts: body.ts || Date.now() };
  // broadcast
  const raw = JSON.stringify(payload);
  clients.forEach(ws => { if (ws.readyState === WebSocket.OPEN) ws.send(raw); });
  return res.json({ ok:true, broadcasted: ids.length });
});

server.listen(PORT, () => console.log('Realtime server listening on port', PORT));
