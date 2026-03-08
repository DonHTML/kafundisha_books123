import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only run auth checks on /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow public access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        const session = request.cookies.get('admin_session')

        if (!session?.value) {
            // Redirect to login if unauthenticated
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
