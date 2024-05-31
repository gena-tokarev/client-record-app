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

    const targetingRedirectPath =
      request.nextUrl.pathname.startsWith(redirectPath);

    if (!accessToken && !targetingRedirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    NextResponse.next();
  };
}
