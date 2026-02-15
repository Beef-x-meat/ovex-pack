const express = require('express');
const next = require('next');
const compression = require('compression');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();

    const server = express();
    server.disable('x-powered-by');
    server.use(compression());
    server.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
      })
    );
    server.use(express.json({ limit: '1mb' }));

    server.get('/health', (_req, res) => {
      res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Express endpoint for contact form submissions.
    server.post('/api/contact', (req, res) => {
      const { company, name, email, message } = req.body || {};

      if (!company || !name || !email || !message) {
        return res.status(400).json({ ok: false, error: 'Bitte alle Pflichtfelder ausfuellen.' });
      }

      return res.status(200).json({ ok: true, inquiryId: `INQ-${Date.now()}` });
    });

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, host, () => {
      console.log(`Server bereit auf http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Server konnte nicht gestartet werden:', error);
    process.exit(1);
  }
}

startServer();
