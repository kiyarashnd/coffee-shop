// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const url = new URL(request.url);
//   const refreshToken = request.cookies.get('refreshToken')?.value;
//   console.log('refresh token is : ', refreshToken);

//   if (url.pathname === '/') {
//     if (refreshToken) {
//       // if (url.pathname == '/login' || url.pathname == '/signup') {
//       url.pathname = '/area';
//       return NextResponse.redirect(url.toString());
//       // }
//       // return NextResponse.next();
//     }
//     if (!refreshToken) {
//       url.pathname = '/login';
//       return NextResponse.redirect(url.toString());
//     }
//     // url.pathname = '/login';
//     // return NextResponse.redirect(url.toString());
//   }

//   if (url.pathname == '/login') {
//     if (refreshToken) {
//       url.pathname = '/area';
//       return NextResponse.redirect(url.toString());
//     }
//   }
//   if (url.pathname === '/area') {
//     if (!refreshToken) {
//       url.pathname = '/login';
//       return NextResponse.redirect(url.toString());
//     }
//   }
// }

import { NextRequest, NextResponse } from 'next/server';

// Function to check if the refresh token is expired
function isRefreshTokenExpired(refreshToken: string): boolean {
  try {
    // Decode the JWT (assuming it's a JWT) to get the expiration time
    const decodedToken = decodeToken(refreshToken);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // True if expired
  } catch (error) {
    // If decoding fails (e.g., malformed token), treat it as expired
    return true;
  }
}

// Placeholder function to decode the token
function decodeToken(token: string): { exp: number } {
  // In a real app, use a library like 'jwt-decode' or split and parse the JWT manually
  // For this example, we'll simulate decoding
  // Replace this with actual decoding logic
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString()
  );
  return { exp: payload.exp || 0 };
}

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Helper function to redirect to login
  const redirectToLogin = () => {
    url.pathname = '/login';
    return NextResponse.redirect(url.toString());
  };

  // Check if token exists and is valid
  const isTokenValid = refreshToken && !isRefreshTokenExpired(refreshToken);

  // Handle root path (/)
  if (url.pathname === '/') {
    if (isTokenValid) {
      url.pathname = '/area';
      return NextResponse.redirect(url.toString());
    }
    // If token is missing or expired, redirect to login
    return redirectToLogin();
  }

  // Handle login path (/login)
  if (url.pathname === '/login') {
    if (isTokenValid) {
      url.pathname = '/area';
      return NextResponse.redirect(url.toString());
    }
    // If token is invalid or missing, stay on login page
    return NextResponse.next();
  }

  // Handle protected area path (/area)
  if (url.pathname === '/area' || url.pathname === '/get-all') {
    if (!isTokenValid) {
      return redirectToLogin();
    }
    // If token is valid, allow access to /area
    return NextResponse.next();
  }

  // For other routes, proceed as normal
  return NextResponse.next();
}
