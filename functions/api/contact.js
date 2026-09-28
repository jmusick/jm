/**
 * Contact form endpoint: POST /api/contact
 *
 * Cloudflare Pages Function that verifies Turnstile and sends the message
 * through Cloudflare Email Sending. The rest of the site stays static.
 *
 * Plaintext config lives in wrangler.toml [vars]. Secrets are set in the
 * Pages dashboard (or .dev.vars locally) and never committed:
 *   CF_EMAIL_API_TOKEN    API token with Email Sending: Edit
 *   TURNSTILE_SECRET_KEY  Turnstile widget secret
 *   CONTACT_TO_EMAIL      inbox that receives messages
 */

const LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  messageMax: 4000,
}

const TURNSTILE_ACTION = 'contact'
const SUCCESS_MESSAGE = "Message sent! I'll get back to you soon."

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })

const asString = (value) => (typeof value === 'string' ? value.trim() : '')

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// Strip line breaks from values interpolated into header-like fields.
const singleLine = (value) => value.replace(/[\r\n]+/g, ' ').trim()

const verifyTurnstile = async (request, env, token) => {
  if (!token || token.length > 2048) {
    return { ok: false, status: 400, error: 'Please complete the spam check.' }
  }

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  })
  const remoteIp = request.headers.get('CF-Connecting-IP')
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      return { ok: false, status: 502, error: 'Could not reach the verification service.' }
    }

    const data = await response.json()
    const allowedHostnames = (env.TURNSTILE_HOSTNAMES || '')
      .split(',')
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean)
    // Cloudflare's test secret (local dev only) reports example.com and no
    // action, so only the success flag is meaningful for it.
    const isTestKeyResult = data.metadata?.result_with_testing_key === true
    const valid =
      data.success === true &&
      (isTestKeyResult ||
        (data.action === TURNSTILE_ACTION &&
          typeof data.hostname === 'string' &&
          allowedHostnames.includes(data.hostname.toLowerCase())))

    return valid
      ? { ok: true }
      : { ok: false, status: 400, error: 'Verification failed. Please try again.' }
  } catch {
    return { ok: false, status: 502, error: 'Could not reach the verification service.' }
  }
}

const sendEmail = async (message, env) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CF_EMAIL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: message.to,
        from: message.from,
        subject: message.subject,
        text: message.text,
        html: message.html,
        // Cloudflare's REST schema requires this exact snake_case field.
        reply_to: message.replyTo,
      }),
    }
  )

  const data = await response.json().catch(() => null)

  if (!response.ok || !data?.success) {
    throw new Error(data?.errors?.[0]?.message || `Cloudflare Email Sending error: ${response.status}`)
  }
}

const buildBodies = ({ name, email, message }) => {
  const text = [
    'New message from the justinmusick.com contact form',
    '',
    `Name:  ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message),
  }

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>Contact form message</title>
  </head>
  <body style="margin:0;padding:24px;background-color:#f3f4f6;color:#111827;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:700px;margin:0 auto;border-collapse:collapse;">
      <tr>
        <td style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;">
          <h2 style="margin:0 0 16px;font-size:20px;line-height:1.3;">New message from justinmusick.com</h2>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${safe.name}</p>
          <p style="margin:0 0 16px;"><strong>Email:</strong> <a href="mailto:${safe.email}" style="color:#111827;">${safe.email}</a></p>
          <div style="white-space:pre-wrap;background-color:#f9fafb;border:1px solid #e5e7eb;padding:12px;border-radius:8px;">${safe.message}</div>
          <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Reply directly to this email to answer the sender.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { text, html }
}

export const onRequestPost = async ({ request, env }) => {
  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Malformed request.' }, 400)
  }

  // Honeypot: real visitors never fill this in, so pretend it worked.
  if (asString(payload?.website)) {
    return json({ message: SUCCESS_MESSAGE })
  }

  const name = singleLine(asString(payload?.name))
  const email = asString(payload?.email).toLowerCase()
  const message = asString(payload?.message)

  if (!name || !email || !message) {
    return json({ error: 'Name, email, and message are required.' }, 400)
  }
  if (name.length > LIMITS.name) {
    return json({ error: `Name must be ${LIMITS.name} characters or less.` }, 400)
  }
  if (email.length > LIMITS.email || !isValidEmail(email)) {
    return json({ error: 'Please provide a valid email address.' }, 400)
  }
  if (message.length < LIMITS.messageMin) {
    return json({ error: `Message must be at least ${LIMITS.messageMin} characters.` }, 400)
  }
  if (message.length > LIMITS.messageMax) {
    return json({ error: `Message must be ${LIMITS.messageMax} characters or less.` }, 400)
  }

  const missing = [
    'CF_ACCOUNT_ID',
    'CF_EMAIL_API_TOKEN',
    'CONTACT_TO_EMAIL',
    'EMAIL_FROM_CONTACT',
    'TURNSTILE_SECRET_KEY',
    'TURNSTILE_HOSTNAMES',
  ].filter((key) => !env[key])
  if (missing.length) {
    console.error('Contact form is missing configuration', missing)
    return json({ error: 'The contact form is not configured.' }, 503)
  }

  const captcha = await verifyTurnstile(request, env, asString(payload?.captchaToken))
  if (!captcha.ok) {
    return json({ error: captcha.error }, captcha.status)
  }

  const { text, html } = buildBodies({ name, email, message })

  try {
    await sendEmail(
      {
        to: env.CONTACT_TO_EMAIL,
        from: env.EMAIL_FROM_CONTACT,
        replyTo: email,
        subject: `[justinmusick.com] Contact form | ${name}`,
        text,
        html,
      },
      env
    )
  } catch (error) {
    console.error('Contact email send failed', error)
    return json({ error: 'Could not send your message. Please try again in a moment.' }, 502)
  }

  return json({ message: SUCCESS_MESSAGE }, 201)
}
