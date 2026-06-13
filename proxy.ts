import { createProxy } from 'next-i18next/proxy'
import i18nConfig from './i18n.config'
import { NextRequest, NextResponse } from 'next/server'

const i18nProxy = createProxy(i18nConfig)

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const auth = request.cookies.get('admin_auth')?.value;
    if (!auth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return i18nProxy(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
}