import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/', '/dashboard']
const authRoutes = ['/', '/login']

export function middleware(request: NextRequest) {
      const { pathname } = request.nextUrl
    //   const token = request.cookies.get('token')?.value
    //   let paths = pathname.split('/')

    // if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }

    // if (authRoutes.some(route => pathname.startsWith(route)) && token) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }


    //   if ((paths.includes('dashboard') || pathname === '/') && !token) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    //   }
    //   if (token && authRoutes.includes(pathname)) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url))
    //   }
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/login'],
}