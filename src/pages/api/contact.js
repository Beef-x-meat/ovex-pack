import fs from 'fs';
import nodemailer from 'nodemailer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false
  }
};

function parseForm(req) {
  const form = formidable({ multiples: false, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

function str(value) {
  if (Array.isArray(value)) return String(value[0] || '');
  return String(value || '');
}

function getFile(files, key) {
  const value = files?.[key];
  if (!value) return null;
  return Array.isArray(value) ? value[0] : value;
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

async function buildInquiryPdf({ inquiryId, company, name, email, phone, message }) {
  const doc = await PDFDocument.create();
  let page = doc.addPage([595, 842]);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const rows = [
    `Anfrage-ID: ${inquiryId}`,
    `Firma: ${company}`,
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || '-'}`,
    '',
    'Nachricht:',
    ...String(message || '').split('\n')
  ];

  let y = 800;
  page.drawText('OvexPack Kundenanfrage', { x: 48, y, size: 18, font: bold, color: rgb(0.12, 0.12, 0.12) });
  y -= 30;

  for (const line of rows) {
    page.drawText(line.slice(0, 120), { x: 48, y, size: 11, font: regular, color: rgb(0.2, 0.2, 0.2) });
    y -= 16;
    if (y < 50) {
      page = doc.addPage([595, 842]);
      y = 800;
    }
  }

  return doc.save();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let parsed;
  try {
    parsed = await parseForm(req);
  } catch {
    return res.status(400).json({ ok: false, error: 'Ungueltige Formdaten.' });
  }

  const company = str(parsed.fields.company);
  const name = str(parsed.fields.name);
  const email = str(parsed.fields.email);
  const phone = str(parsed.fields.phone);
  const message = str(parsed.fields.message);
  const logoFile = getFile(parsed.files, 'logoFile');

  if (!company || !name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Bitte alle Pflichtfelder ausfuellen.' });
  }

  const inquiryId = `INQ-${Date.now()}`;
  const transporter = createTransporter();

  if (!transporter) {
    return res.status(200).json({
      ok: true,
      inquiryId,
      note: 'SMTP nicht konfiguriert. Anfrage lokal akzeptiert.'
    });
  }

  try {
    const recipient = process.env.INQUIRY_RECEIVER || 'info@ovex-pack.ch';
    const sender = process.env.INQUIRY_SENDER || process.env.SMTP_USER;

    const pdfBytes = await buildInquiryPdf({ inquiryId, company, name, email, phone, message });

    const attachments = [
      {
        filename: `${inquiryId}.pdf`,
        content: Buffer.from(pdfBytes),
        contentType: 'application/pdf'
      }
    ];

    if (logoFile?.filepath) {
      attachments.push({
        filename: logoFile.originalFilename || 'logo-upload',
        content: fs.readFileSync(logoFile.filepath)
      });
    }

    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Neue Kundenanfrage ${inquiryId}`,
      text: `Neue Anfrage von ${name} (${company})\nE-Mail: ${email}\nTelefon: ${phone || '-'}\n\n${message}`,
      attachments
    });

    await transporter.sendMail({
      from: sender,
      to: email,
      subject: `Bestaetigung Ihrer Anfrage (${inquiryId})`,
      text:
        `Hallo ${name},\n\n` +
        `wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden mit dem passenden Angebot.\n\n` +
        `Referenz: ${inquiryId}\n\n` +
        `Freundliche Gruesse\nOvexPack Team`
    });

    return res.status(200).json({ ok: true, inquiryId });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'E-Mail Versand fehlgeschlagen.' });
  }
}
