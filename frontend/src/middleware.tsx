import { NextRequest, NextResponse } from 'next/server';
import { Tokens } from '@/services/redux/slices/auth/auth.service';

export async function middleware(request: NextRequest, response: NextResponse) {
  const refreshToken = request.cookies.get(Tokens.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return redirectToLogin(request)
  }

  return NextResponse.next()
}

export const config ={
  matcher: ['/']
}

const redirectToLogin = (request: NextRequest) => {
  return NextResponse.redirect(
    new URL('/login', request.url)
  )
}