import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // Only run auth checks on /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Handle login page access
        if (request.nextUrl.pathname === '/admin/login') {
            const session = request.cookies.get('admin_session')
            if (session?.value === 'authenticated') {
                return NextResponse.redirect(new URL('/admin', request.url))
            }
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
