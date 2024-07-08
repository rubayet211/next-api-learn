import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";
import { logMiddleware } from "./middlewares/api/logMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export default function middleware(request: Request) {
  if (request.url.includes("/api/blogs")) {
    const logResult = logMiddleware(request);
    console.log(logResult);
  }

  const authResult = authMiddleware(request);
  if (!authResult?.isValid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}
