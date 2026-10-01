import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/session';
import { getUploadsDir, maintainCmsDatabase, uid } from '@/lib/cms/store';
import { optimizeUploadedImage, publicMediaUrl } from '@/lib/cms/media';

export const runtime = 'nodejs';

const ALLOWED = new Set<string>([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_PDF = 25 * 1024 * 1024;

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: 'invalid_form' }, { status: 400 });
  }

  const files = form.getAll('files').filter((item): item is File => item instanceof File);
  const single = form.get('file');
  if (single instanceof File) files.push(single);

  if (files.length === 0) {
    return NextResponse.json({ ok: false, error: 'no_files' }, { status: 400 });
  }

  const uploadsDir = getUploadsDir();
  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ ok: false, error: 'unsupported_type' }, { status: 400 });
    }

    const max = file.type === 'application/pdf' ? MAX_PDF : MAX_IMAGE;
    if (file.size > max) {
      return NextResponse.json({ ok: false, error: 'file_too_large' }, { status: 400 });
    }

    const raw = Buffer.from(await file.arrayBuffer());
    let buffer: Buffer = raw;
    let ext: string = path.extname(file.name).toLowerCase() || '.bin';
    let mime = file.type;

    if (file.type.startsWith('image/')) {
      const optimized = await optimizeUploadedImage(raw, file.type);
      buffer = optimized.buffer;
      ext = optimized.ext;
      mime = optimized.mime;
    } else if (file.type === 'application/pdf') {
      ext = '.pdf';
    }

    const prefix = file.type === 'application/pdf' ? 'doc' : 'img';
    const filename = `${uid(prefix)}${file.type === 'application/pdf' ? '.pdf' : ext}`;
    fs.writeFileSync(path.join(uploadsDir, filename), buffer);
    urls.push(publicMediaUrl(filename));
  }

  maintainCmsDatabase();

  return NextResponse.json({ ok: true, url: urls[0], urls });
}

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const { listUploadFiles } = await import('@/lib/cms/store');
  const files = listUploadFiles().map((name) => ({
    name,
    url: publicMediaUrl(name),
    size: fs.statSync(path.join(getUploadsDir(), name)).size,
  }));

  return NextResponse.json({ ok: true, files });
}
