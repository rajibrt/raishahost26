import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-static';

// Standalone policy document: no account, client scripts, forms or analytics.
export async function GET() {
  const html = await readFile(path.join(process.cwd(), 'public/jago/privacy-policy.html'), 'utf8');
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
