import { NextResponse } from 'next/server';

export function proxy(request) {
  const isAuthed = request.cookies.get('devdungeon_auth');

  if (!isAuthed) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dungeons/:path*',
    '/battle/:path*',
    '/pvp/:path*',
    '/leaderboard/:path*',
  ],
};
