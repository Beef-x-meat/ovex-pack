export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { productName, company, email, quantity, printType } = req.body || {};

  if (!productName || !company || !email || !quantity || !printType) {
    return res.status(400).json({ ok: false, error: 'Pflichtfelder fehlen.' });
  }

  const requestId = `Q-${Date.now()}`;
  return res.status(200).json({ ok: true, requestId, message: 'Anfrage erhalten' });
}
