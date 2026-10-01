import fs from 'fs';
import path from 'path';

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

type OptimizeResult = {
  buffer: Buffer;
  ext: '.webp' | '.jpg' | '.png';
  mime: string;
};

export async function optimizeUploadedImage(
  input: Buffer,
  mime: string,
): Promise<OptimizeResult> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const sharpMod = require('sharp') as typeof import('sharp') & { default?: typeof import('sharp') };
    const sharp = typeof sharpMod === 'function' ? sharpMod : sharpMod.default;
    if (!sharp) throw new Error('sharp unavailable');
    const pipeline = sharp(input, { failOn: 'none' }).rotate().resize({
      width: MAX_WIDTH,
      height: MAX_WIDTH,
      fit: 'inside',
      withoutEnlargement: true,
    });

    if (mime === 'image/png' || mime === 'image/jpeg' || mime === 'image/webp') {
      const buffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer();
      return { buffer, ext: '.webp', mime: 'image/webp' };
    }

    const buffer = await pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
    return { buffer, ext: '.jpg', mime: 'image/jpeg' };
  } catch {
    return {
      buffer: input,
      ext: mime === 'image/png' ? '.png' : '.jpg',
      mime: mime || 'image/jpeg',
    };
  }
}

export function publicMediaUrl(filename: string) {
  return `/api/media/${filename}`;
}

export function resolveMediaPath(filename: string) {
  const safe = path.basename(filename);
  if (!safe || safe.includes('..')) return null;
  return safe;
}

export function readMediaFile(uploadsDir: string, filename: string) {
  const safe = resolveMediaPath(filename);
  if (!safe) return null;
  const filePath = path.join(uploadsDir, safe);
  if (!fs.existsSync(filePath)) return null;
  return { filePath, safe };
}
