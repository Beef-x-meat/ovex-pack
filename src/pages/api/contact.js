export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { company, name, email, message } = req.body || {};
  if (!company || !name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Bitte alle Pflichtfelder ausfuellen.' });
  }

  return res.status(200).json({ ok: true, inquiryId: `INQ-${Date.now()}` });
}
