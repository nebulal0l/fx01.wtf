import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const validateKey = (key: string): boolean => {
  const validKeys = ["FX01WTF_AUTH", "FX01WTF_AUTH2"]
  return validKeys.includes(key.trim().toUpperCase())
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const key = request.cookies.get("fx01_key")?.value

    if (!key || !validateKey(key)) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
}

