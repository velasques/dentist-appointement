import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/app/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const localePrefix = `/${routing.locales.find((loc) =>
    pathname.startsWith(`/${loc}`)
  )}`;
  const pathWithoutLocale = pathname.startsWith(localePrefix)
    ? pathname.replace(localePrefix, "") || "/"
    : pathname;

  if (pathWithoutLocale.startsWith("/admin/dashboard")) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`${localePrefix}/admin`, request.url)
      );
    }
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/:locale/admin/dashboard/:path*",
  ],
};
