import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getUploadsDir } from '@/lib/cms/store';
import { readMediaFile } from '@/lib/cms/media';

export const runtime = 'nodejs';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
};

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: pathParts } = await params;
  const parts = pathParts ?? [];
  if (parts.length === 0 || parts.some((part) => part.includes('..'))) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const filename = parts.map((part) => path.basename(part)).join('/');
  const resolved = readMediaFile(getUploadsDir(), filename);
  if (!resolved) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const buffer = fs.readFileSync(resolved.filePath);
  const ext = path.extname(resolved.safe).toLowerCase();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
