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

function formatDate() {
  return new Date().toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function buildInquiryPdf({ inquiryId, company, name, email, phone, message }) {
  const doc = await PDFDocument.create();
  let page = doc.addPage([595, 842]);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const darkGray = rgb(0.12, 0.12, 0.12);
  const midGray = rgb(0.35, 0.35, 0.35);
  const lightGray = rgb(0.55, 0.55, 0.55);
  // Header bar
  page.drawRectangle({ x: 0, y: 792, width: 595, height: 50, color: rgb(0.08, 0.08, 0.08) });
  page.drawText('OvexPack', { x: 48, y: 808, size: 16, font: bold, color: rgb(1, 1, 1) });
  page.drawText('Kundenanfrage', { x: 48, y: 793, size: 9, font: regular, color: rgb(0.7, 0.7, 0.7) });

  // Inquiry ID + date top right
  page.drawText(inquiryId, { x: 595 - 48 - bold.widthOfTextAtSize(inquiryId, 10), y: 810, size: 10, font: bold, color: rgb(0.85, 0.85, 0.85) });
  const dateStr = formatDate();
  page.drawText(dateStr, { x: 595 - 48 - regular.widthOfTextAtSize(dateStr, 8), y: 797, size: 8, font: regular, color: rgb(0.6, 0.6, 0.6) });

  let y = 760;

  // Section: Kontaktdaten
  page.drawText('KONTAKTDATEN', { x: 48, y, size: 8, font: bold, color: lightGray });
  y -= 6;
  page.drawLine({ start: { x: 48, y }, end: { x: 547, y }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) });
  y -= 16;

  const contactRows = [
    ['Firma', company],
    ['Name', name],
    ['E-Mail', email],
    ['Telefon', phone || '-']
  ];

  for (const [label, value] of contactRows) {
    page.drawText(label + ':', { x: 48, y, size: 10, font: bold, color: darkGray });
    page.drawText(value, { x: 160, y, size: 10, font: regular, color: midGray });
    y -= 16;
  }

  y -= 10;

  // Section: Anfrage / Konfiguration
  page.drawText('ANFRAGE & KONFIGURATION', { x: 48, y, size: 8, font: bold, color: lightGray });
  y -= 6;
  page.drawLine({ start: { x: 48, y }, end: { x: 547, y }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) });
  y -= 18;

  const messageLines = String(message || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  for (const rawLine of messageLines) {
    // Word-wrap lines at 90 chars to fit page width
    const words = rawLine.split(' ');
    let currentLine = '';
    for (const word of words) {
      const test = currentLine ? `${currentLine} ${word}` : word;
      if (regular.widthOfTextAtSize(test, 10) > 499) {
        if (currentLine) {
          const isLabel = currentLine.endsWith(':');
          page.drawText(currentLine, {
            x: 48,
            y,
            size: 10,
            font: isLabel ? bold : regular,
            color: isLabel ? darkGray : midGray
          });
          y -= 15;
          currentLine = word;
        } else {
          currentLine = word;
        }
      } else {
        currentLine = test;
      }
    }
    if (currentLine) {
      const isLabel = currentLine.endsWith(':');
      page.drawText(currentLine, {
        x: 48,
        y,
        size: 10,
        font: isLabel ? bold : regular,
        color: isLabel ? darkGray : midGray
      });
    }
    y -= 15;

    if (y < 60) {
      page = doc.addPage([595, 842]);
      y = 780;
    }
  }

  // Footer
  page.drawLine({ start: { x: 48, y: 50 }, end: { x: 547, y: 50 }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) });
  page.drawText('OvexPack – Individuelle Verpackungen', { x: 48, y: 35, size: 8, font: regular, color: lightGray });
  page.drawText(inquiryId, { x: 547 - bold.widthOfTextAtSize(inquiryId, 8), y: 35, size: 8, font: bold, color: lightGray });

  return doc.save();
}

function buildCompanyText({ inquiryId, company, name, email, phone, message }) {
  const date = formatDate();
  return [
    `NEUE KUNDENANFRAGE – OvexPack`,
    `Anfrage-ID: ${inquiryId}`,
    `Eingegangen: ${date}`,
    ``,
    `────────────────────────────────────`,
    `KONTAKTDATEN`,
    `────────────────────────────────────`,
    `Firma:    ${company}`,
    `Name:     ${name}`,
    `E-Mail:   ${email}`,
    `Telefon:  ${phone || '-'}`,
    ``,
    `────────────────────────────────────`,
    `ANFRAGE & KONFIGURATION`,
    `────────────────────────────────────`,
    message,
    ``,
    `────────────────────────────────────`,
    `Antwort direkt an: ${email}`,
    `PDF dieser Anfrage im Anhang.`
  ].join('\n');
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
    return res.status(400).json({ ok: false, error: 'Bitte alle Pflichtfelder ausfüllen.' });
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
    const recipient = process.env.INQUIRY_RECEIVER || 'denisemirzeba@gmail.com';
    const sender = process.env.INQUIRY_SENDER || process.env.SMTP_USER;

    const pdfBytes = await buildInquiryPdf({ inquiryId, company, name, email, phone, message });

    const attachments = [
      {
        filename: `Anfrage-${inquiryId}.pdf`,
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

    // E-Mail an das Unternehmen (Text + PDF-Anhang)
    await transporter.sendMail({
      from: `"OvexPack Anfragen" <${sender}>`,
      to: recipient,
      replyTo: email,
      subject: `Neue Kundenanfrage ${inquiryId} – ${company}`,
      text: buildCompanyText({ inquiryId, company, name, email, phone, message }),
      attachments
    });

    // Bestätigungs-E-Mail an den Kunden
    await transporter.sendMail({
      from: `"OvexPack" <${sender}>`,
      to: email,
      subject: `Ihre Anfrage bei OvexPack wurde erhalten (${inquiryId})`,
      text: [
        `Hallo ${name},`,
        ``,
        `vielen Dank für Ihre Anfrage bei OvexPack!`,
        ``,
        `Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden`,
        `mit einem passenden Angebot bei Ihnen.`,
        ``,
        `Ihre Referenznummer: ${inquiryId}`,
        ``,
        `Bei Fragen können Sie uns jederzeit unter info@ovex-pack.ch erreichen.`,
        ``,
        `Freundliche Grüsse`,
        `Ihr OvexPack Team`
      ].join('\n')
    });

    return res.status(200).json({ ok: true, inquiryId });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'E-Mail Versand fehlgeschlagen.' });
  }
}
