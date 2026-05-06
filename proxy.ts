import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { auth } from "@/auth";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
    // Check if the current path starts with /admin (considering optional locale)
    const pathname = req.nextUrl.pathname;
    const isAdmin = req.auth?.user !== undefined && "role" in req.auth.user && req.auth.user.role === "admin"

    if (isAdmin && startsWith(pathname, "/admin/login")) return Response.redirect(new URL("/admin", req.nextUrl))
    if (!req.auth && startsWith(pathname, "/admin") && !startsWith(pathname, "/admin/login")) return Response.redirect(new URL("/admin/login", req.nextUrl))
    if (!isAdmin && req.auth && startsWith(pathname, "/admin")) return Response.redirect(new URL("/", req.nextUrl))


    return intlMiddleware(req);
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};

function startsWith(pathname: string, path: string): boolean {
    const locales = routing.locales.map(l => `/${l}`).concat("")
    return locales.some(locale => {
        return pathname.startsWith(`${locale}${path}`)
    })
}