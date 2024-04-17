import { CookieTokenNamesEnum } from "@/types/enums";
import { NextMiddleware, NextResponse, type NextRequest } from "next/server";

type Options = {
  redirectPath: string;
};

export function withAuthMiddleware(
  next: NextMiddleware,
  { redirectPath }: Options,
) {
  return function (request: NextRequest) {
    const accessToken = request.cookies.get(CookieTokenNamesEnum.ACCESS)?.value;
    const refreshToken = request.cookies.get(
      CookieTokenNamesEnum.REFRESH,
    )?.value;

    const targetingRedirectPath = request.nextUrl.pathname === redirectPath;

    if (!accessToken || !refreshToken) {
      if (!targetingRedirectPath) {
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    } else {
      if (targetingRedirectPath) {
        return NextResponse.redirect(new URL(process.env.NEXT_APP_HOST));
      }
    }

    NextResponse.next();
  };
}
