import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Reinforce Security Headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Simple check for suspicious characters in URL (basic XSS/SQLi prevention at URL level)
  const { pathname, search } = request.nextUrl
  if (search.includes('<script>') || search.includes('javascript:') || search.includes('UNION SELECT')) {
    return new NextResponse('Potential malicious activity detected', { status: 403 })
  }

  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
