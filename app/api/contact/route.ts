import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_SERVICES = [
  'AI marketing na društvenim mrežama',
  'Vizualni identitet',
  'Video produkcija',
  'Dizajn jelovnika',
  'Digitalna strategija',
  'Drugo',
  'AI marketing on social media',
  'Visual identity',
  'Video production',
  'Menu design',
  'Digital strategy',
  'Other',
] as const;

type Lang = 'hr' | 'en';

const errors: Record<Lang, Record<string, string>> = {
  hr: {
    name: 'Ime mora imati između 2 i 100 znakova.',
    email: 'Email nije ispravnog formata.',
    service: 'Odaberite uslugu.',
    message: 'Poruka mora imati između 20 i 2000 znakova.',
    validation: 'Sva polja su obavezna i ispravnog formata.',
  },
  en: {
    name: 'Name must be between 2 and 100 characters.',
    email: 'Email is not properly formatted.',
    service: 'Please select a service.',
    message: 'Message must be between 20 and 2000 characters.',
    validation: 'All fields are required and properly formatted.',
  },
};

function formatTimestamp(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtmlEmail(name: string, email: string, service: string, message: string): string {
  const timestamp = formatTimestamp();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="hr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111;border-radius:4px;overflow:hidden;">
          <tr>
            <td style="height:4px;background-color:#D4A574;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 40px 24px;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#D4A574;line-height:1.3;">
                Nova poruka — Mellasia kontakt forma
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid rgba(212,165,116,0.25);padding:24px 0 0;">
                    <p style="margin:0 0 8px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#D4A574;">OD</p>
                    <p style="margin:0 0 4px;font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#ffffff;">${safeName}</p>
                    <p style="margin:0;font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#bbbbbb;">
                      <a href="mailto:${safeEmail}" style="color:#bbbbbb;text-decoration:none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid rgba(212,165,116,0.25);padding:24px 0 0;margin-top:24px;">
                    <p style="margin:0 0 8px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#D4A574;">USLUGA</p>
                    <p style="margin:0;font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#ffffff;">${safeService}</p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid rgba(212,165,116,0.25);padding:24px 0 0;">
                    <p style="margin:0 0 8px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#D4A574;">PORUKA</p>
                    <p style="margin:0;font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#ffffff;line-height:1.6;white-space:pre-wrap;">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 40px;">
              <p style="margin:0;font-family:system-ui,-apple-system,sans-serif;font-size:12px;color:#888888;line-height:1.5;">
                ${timestamp} · Poslano s mellasia.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTextEmail(name: string, email: string, service: string, message: string): string {
  const timestamp = formatTimestamp();

  return `Nova poruka — Mellasia kontakt forma

OD
${name}
${email}

USLUGA
${service}

PORUKA
${message}

---
${timestamp} · Poslano s mellasia.com`;
}

function validateBody(
  body: Record<string, unknown>,
  lang: Lang
): { ok: true; data: { name: string; email: string; service: string; message: string } } | { ok: false; error: string } {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: errors[lang].name };
  }

  if (!email || email.length > 200 || !EMAIL_REGEX.test(email)) {
    return { ok: false, error: errors[lang].email };
  }

  if (!service || !VALID_SERVICES.includes(service as (typeof VALID_SERVICES)[number])) {
    return { ok: false, error: errors[lang].service };
  }

  if (message.length < 20 || message.length > 2000) {
    return { ok: false, error: errors[lang].message };
  }

  return { ok: true, data: { name, email, service, message } };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'validation' }, { status: 400 });
  }

  const honeypot = typeof body._honeypot === 'string' ? body._honeypot : '';
  if (honeypot !== '') {
    return Response.json({ ok: true });
  }

  const lang: Lang = body.lang === 'en' ? 'en' : 'hr';
  const validation = validateBody(body, lang);

  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const { name, email, service, message } = validation.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_ADDRESS;
  const to = process.env.RESEND_TO_ADDRESS;

  if (!apiKey || !from || !to) {
    console.error('Contact form: missing Resend environment variables');
    return Response.json({ error: 'send_failed' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Pismo studiju — ${name} (${service})`,
      html: buildHtmlEmail(name, email, service, message),
      text: buildTextEmail(name, email, service, message),
    });

    if (error) {
      console.error('Contact form: Resend error', error);
      return Response.json({ error: 'send_failed' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact form: send failed', err);
    return Response.json({ error: 'send_failed' }, { status: 500 });
  }
}
