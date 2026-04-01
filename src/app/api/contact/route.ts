import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
  turnstileToken?: unknown;
};

type RateLimitEntry = {
  count: number;
  firstSeenAt: number;
  lastSeenAt: number;
  expiresAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  count: number;
  firstSeenAt: number;
  lastSeenAt: number;
  expiresAt: number;
};

type GeoLookupResult = {
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  org?: string;
  timezone?: string;
};

type ClientMetadata = {
  ipAddress: string;
  ipLocation: string;
  isp: string;
  browser: string;
  operatingSystem: string;
  deviceType: string;
  userAgent: string;
  language: string;
  origin: string;
  referer: string;
  forwardedFor: string;
  submissionTime: string;
  ipSubmissionCount: number;
  emailSubmissionCount: number;
  submissionWindowLabel: string;
};

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 160;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 4000;
const MIN_MESSAGE_LENGTH = 10;
const MIN_WORD_COUNT = 3;
const MIN_FORM_FILL_MS = 4000;
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 3;
const MAX_REQUESTS_PER_EMAIL = 2;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const GEO_LOOKUP_TIMEOUT_MS = 1500;

const rateLimitStore = new Map<string, RateLimitEntry>();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';

  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function normalizeMessage(value: unknown) {
  if (typeof value !== 'string') return '';

  return value.trim().replace(/\r\n/g, '\n').slice(0, MAX_MESSAGE_LENGTH);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function countWords(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}

function hasExcessiveLinks(value: string) {
  const matches = value.match(/https?:\/\/|www\./gi);
  return (matches?.length ?? 0) > 1;
}

function getClientIp(req: NextRequest) {
  const cloudflareIp = req.headers.get('cf-connecting-ip');
  if (cloudflareIp) {
    return cloudflareIp.trim();
  }

  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = req.headers.get('x-real-ip');
  return realIp?.trim() || 'unknown';
}

function recordRateLimit(key: string, limit: number): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.expiresAt <= now) {
    const nextEntry = {
      count: 1,
      firstSeenAt: now,
      lastSeenAt: now,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    };
    rateLimitStore.set(key, nextEntry);
    return { allowed: true, ...nextEntry };
  }

  if (entry.count >= limit) {
    entry.lastSeenAt = now;
    return { allowed: false, ...entry };
  }

  entry.count += 1;
  entry.lastSeenAt = now;
  return { allowed: true, ...entry };
}

function cleanupRateLimitStore() {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.expiresAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function isAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return true;

  const allowedOrigins = new Set([
    'http://localhost:3000',
    'http://localhost:3001',
    'https://raishahost.com',
    'https://www.raishahost.com',
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean));

  return allowedOrigins.has(origin);
}

function formatDateTime(timestamp: number) {
  return new Intl.DateTimeFormat('en-BD', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Dhaka',
  }).format(timestamp);
}

function formatWindowLabel(expiresAt: number) {
  const remainingMinutes = Math.max(1, Math.ceil((expiresAt - Date.now()) / 60000));
  return `last ${RATE_LIMIT_WINDOW_MS / 60000} minutes, resets in about ${remainingMinutes} minute(s)`;
}

function normalizeHeaderValue(value: string | null, fallback = 'Unavailable', maxLength = 300) {
  if (!value) return fallback;

  return normalizeText(value, maxLength) || fallback;
}

function detectBrowser(userAgent: string) {
  if (!userAgent) return 'Unknown';
  if (/edg\//i.test(userAgent)) return 'Microsoft Edge';
  if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) return 'Opera';
  if (/chrome\//i.test(userAgent) && !/edg\//i.test(userAgent)) return 'Google Chrome';
  if (/firefox\//i.test(userAgent)) return 'Mozilla Firefox';
  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent)) return 'Safari';
  return 'Unknown';
}

function detectOperatingSystem(userAgent: string) {
  if (!userAgent) return 'Unknown';
  if (/windows nt/i.test(userAgent)) return 'Windows';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS';
  if (/mac os x/i.test(userAgent)) return 'macOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  return 'Unknown';
}

function detectDeviceType(userAgent: string) {
  if (!userAgent) return 'Unknown';
  if (/ipad|tablet/i.test(userAgent)) return 'Tablet';
  if (/mobi|iphone|android/i.test(userAgent)) return 'Mobile';
  return 'Desktop';
}

function isPublicIp(ip: string) {
  if (!ip || ip === 'unknown') return false;
  if (ip === '::1' || ip === '127.0.0.1') return false;
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(ip)) return false;
  return !/^fc|^fd/i.test(ip);
}

async function lookupIpLocation(ip: string): Promise<GeoLookupResult | null> {
  const endpointTemplate =
    process.env.IP_GEOLOCATION_API_URL || 'https://ipwho.is/{ip}';

  if (!isPublicIp(ip)) {
    return null;
  }

  const endpoint = endpointTemplate.replace('{ip}', encodeURIComponent(ip));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEO_LOOKUP_TIMEOUT_MS);

    const response = await fetch(endpoint, {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as Record<string, unknown>;
    if (data.success === false) {
      return null;
    }

    return {
      city: typeof data.city === 'string' ? data.city : undefined,
      region:
        typeof data.region === 'string'
          ? data.region
          : typeof data.region_name === 'string'
            ? (data.region_name as string)
            : undefined,
      country:
        typeof data.country === 'string'
          ? data.country
          : typeof data.country_name === 'string'
            ? (data.country_name as string)
            : undefined,
      postal: typeof data.postal === 'string' ? data.postal : undefined,
      org:
        typeof data.connection === 'object' &&
        data.connection !== null &&
        typeof (data.connection as Record<string, unknown>).isp === 'string'
          ? ((data.connection as Record<string, unknown>).isp as string)
          : typeof data.org === 'string'
            ? (data.org as string)
            : undefined,
      timezone:
        typeof data.timezone === 'object' &&
        data.timezone !== null &&
        typeof (data.timezone as Record<string, unknown>).id === 'string'
          ? ((data.timezone as Record<string, unknown>).id as string)
          : undefined,
    };
  } catch (error) {
    console.error('IP geolocation lookup failed:', error);
    return null;
  }
}

function formatGeoLocation(geo: GeoLookupResult | null) {
  if (!geo) return 'Unavailable';

  const parts = [geo.city, geo.region, geo.country, geo.postal].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : 'Unavailable';
}

function buildClientMetadata(
  req: NextRequest,
  clientIp: string,
  geo: GeoLookupResult | null,
  ipRateLimit: RateLimitResult,
  emailRateLimit: RateLimitResult
): ClientMetadata {
  const userAgent = normalizeHeaderValue(req.headers.get('user-agent'));

  return {
    ipAddress: clientIp,
    ipLocation: formatGeoLocation(geo),
    isp: geo?.org || 'Unavailable',
    browser: detectBrowser(userAgent),
    operatingSystem: detectOperatingSystem(userAgent),
    deviceType: detectDeviceType(userAgent),
    userAgent,
    language: normalizeHeaderValue(req.headers.get('accept-language')),
    origin: normalizeHeaderValue(req.headers.get('origin')),
    referer: normalizeHeaderValue(req.headers.get('referer')),
    forwardedFor: normalizeHeaderValue(req.headers.get('x-forwarded-for')),
    submissionTime: formatDateTime(Date.now()),
    ipSubmissionCount: ipRateLimit.count,
    emailSubmissionCount: emailRateLimit.count,
    submissionWindowLabel: formatWindowLabel(Math.max(ipRateLimit.expiresAt, emailRateLimit.expiresAt)),
  };
}

function getValidationError(payload: ContactPayload) {
  const name = normalizeText(payload.name, MAX_NAME_LENGTH);
  const email = normalizeText(payload.email, MAX_EMAIL_LENGTH).toLowerCase();
  const subject = normalizeText(payload.subject, MAX_SUBJECT_LENGTH);
  const message = normalizeMessage(payload.message);
  const website = normalizeText(payload.website, 255);
  const turnstileToken = normalizeText(payload.turnstileToken, 2048);
  const formStartedAt =
    typeof payload.formStartedAt === 'number'
      ? payload.formStartedAt
      : Number(payload.formStartedAt);

  if (website) {
    return 'Failed validation.';
  }

  if (!name || !email || !subject || !message) {
    return 'All fields are required.';
  }

  if (!turnstileToken) {
    return 'Captcha verification is required.';
  }

  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FORM_FILL_MS) {
    return 'Please take a moment to complete the form.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  if (message.length < MIN_MESSAGE_LENGTH || countWords(message) < MIN_WORD_COUNT) {
    return 'Please provide a more detailed message.';
  }

  if (hasExcessiveLinks(`${subject}\n${message}`)) {
    return 'Too many links were detected in the message.';
  }

  return null;
}

function getCleanPayload(payload: ContactPayload) {
  return {
    name: normalizeText(payload.name, MAX_NAME_LENGTH),
    email: normalizeText(payload.email, MAX_EMAIL_LENGTH).toLowerCase(),
    subject: normalizeText(payload.subject, MAX_SUBJECT_LENGTH),
    message: normalizeMessage(payload.message),
    turnstileToken: normalizeText(payload.turnstileToken, 2048),
  };
}

async function verifyTurnstileToken(token: string, ip: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured.');
    return false;
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
    remoteip: ip,
  });

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Turnstile verification request failed with status:', response.status);
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function POST(req: NextRequest) {
  try {
    cleanupRateLimitStore();

    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    }

    const payload = (await req.json()) as ContactPayload;
    const validationError = getValidationError(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const clientIp = getClientIp(req);
    const { name, email, subject, message, turnstileToken } = getCleanPayload(payload);

    const isHuman = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!isHuman) {
      return NextResponse.json(
        { error: 'Captcha verification failed. Please try again.' },
        { status: 400 }
      );
    }

    const ipRateLimit = recordRateLimit(`ip:${clientIp}`, MAX_REQUESTS_PER_IP);
    if (!ipRateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests from this network. Please try again later.' },
        { status: 429 }
      );
    }

    const emailRateLimit = recordRateLimit(`email:${email}`, MAX_REQUESTS_PER_EMAIL);
    if (!emailRateLimit.allowed) {
      return NextResponse.json(
        { error: 'This email address has reached the submission limit. Please try later.' },
        { status: 429 }
      );
    }

    const geo = await lookupIpLocation(clientIp);
    const clientMetadata = buildClientMetadata(req, clientIp, geo, ipRateLimit, emailRateLimit);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const safeIpAddress = escapeHtml(clientMetadata.ipAddress);
    const safeIpLocation = escapeHtml(clientMetadata.ipLocation);
    const safeIsp = escapeHtml(clientMetadata.isp);
    const safeBrowser = escapeHtml(clientMetadata.browser);
    const safeOperatingSystem = escapeHtml(clientMetadata.operatingSystem);
    const safeDeviceType = escapeHtml(clientMetadata.deviceType);
    const safeUserAgent = escapeHtml(clientMetadata.userAgent);
    const safeLanguage = escapeHtml(clientMetadata.language);
    const safeOrigin = escapeHtml(clientMetadata.origin);
    const safeReferer = escapeHtml(clientMetadata.referer);
    const safeForwardedFor = escapeHtml(clientMetadata.forwardedFor);
    const safeSubmissionTime = escapeHtml(clientMetadata.submissionTime);
    const safeSubmissionWindowLabel = escapeHtml(clientMetadata.submissionWindowLabel);

    await transporter.sendMail({
      from: `"RaishaHost Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #05CCF7; font-size: 24px; margin: 0;">New Contact Message</h1>
            <p style="color: #64748b; margin: 8px 0 0;">via raishahost.com contact form</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #64748b; width: 100px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9; font-weight: bold;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b;">
                <a href="mailto:${safeEmail}" style="color: #05CCF7; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #64748b; margin-bottom: 12px;">Message:</p>
            <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; color: #f1f5f9; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</div>
          </div>
          <div style="margin-top: 24px;">
            <p style="color: #64748b; margin-bottom: 12px;">Sender metadata:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b; width: 170px;">IP Address</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeIpAddress}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">IP Location</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeIpLocation}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">ISP / Network</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeIsp}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Device</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeDeviceType} / ${safeBrowser} / ${safeOperatingSystem}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Language</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeLanguage}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Origin</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeOrigin}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Referer</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeReferer}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Forwarded For</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeForwardedFor}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Same IP submissions</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${clientMetadata.ipSubmissionCount} (${safeSubmissionWindowLabel})</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Same email submissions</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${clientMetadata.emailSubmissionCount} (${safeSubmissionWindowLabel})</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Submitted at</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${safeSubmissionTime}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b;">User Agent</td>
                <td style="padding: 10px 0; color: #f1f5f9; word-break: break-word;">${safeUserAgent}</td>
              </tr>
            </table>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; text-align: center;">
            <a href="mailto:${safeEmail}" style="display: inline-block; background: linear-gradient(to right, #05CCF7, #0284c7); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reply to ${safeName}</a>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"RaishaHost" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'We received your message — RaishaHost',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #05CCF7; font-size: 26px; margin: 0;">RaishaHost</h1>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 13px;">Your trusted hosting partner</p>
          </div>
          <h2 style="color: #f1f5f9; font-size: 20px; margin-bottom: 12px;">Hi ${safeName}, we got your message!</h2>
          <p style="color: #94a3b8; line-height: 1.7; margin-bottom: 20px;">
            Thank you for reaching out to us. We have received your inquiry and our team will get back to you within <strong style="color: #05CCF7;">2–4 hours</strong> during business hours (10am – 8pm).
          </p>
          <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #64748b; font-size: 12px; margin: 0 0 8px;">Your message:</p>
            <p style="color: #f1f5f9; margin: 0; font-style: italic; line-height: 1.6;">"${safeMessage}"</p>
          </div>
          <p style="color: #94a3b8; line-height: 1.7;">
            If you need urgent support, please call us at <a href="tel:+8801711380679" style="color: #05CCF7; text-decoration: none;">+880 1711 380 679</a>.
          </p>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center;">
            <p style="color: #475569; font-size: 12px; margin: 0;">
              © 2025 RaishaHost · Bangladesh<br>
              <a href="https://www.raishahost.com" style="color: #05CCF7; text-decoration: none;">www.raishahost.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
