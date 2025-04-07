import { NextResponse } from 'next/server'

export function middleware() {
  // For demo mode, allow all routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}
