import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { stripLocalePrefix } from '@/i18n/locale';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const stripped = stripLocalePrefix(pathname);
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    const response = NextResponse.rewrite(url);
    response.headers.set('x-brainstorm-locale', 'en');
    return response;
  }

  const response = NextResponse.next();
  response.headers.set('x-brainstorm-locale', 'uk');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
