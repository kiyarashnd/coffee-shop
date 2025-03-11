import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const accessToken = request.cookies.get('refreshToken')?.value;

  if (url.pathname === '/') {
    if (accessToken) {
      // if (url.pathname == '/login' || url.pathname == '/signup') {
      url.pathname = '/area';
      return NextResponse.redirect(url.toString());
      // }
      // return NextResponse.next();
    }
    if (!accessToken) {
      url.pathname = '/login';
      return NextResponse.redirect(url.toString());
    }
    // url.pathname = '/login';
    // return NextResponse.redirect(url.toString());
  }
  if (url.pathname == '/login' || url.pathname == '/signup') {
    if (accessToken) {
      url.pathname = '/area';
      return NextResponse.redirect(url.toString());
    }
  }
  if (url.pathname === '/area') {
    if (!accessToken) {
      url.pathname = '/login';
      return NextResponse.redirect(url.toString());
    }
  }
}
