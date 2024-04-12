import { NextResponse } from "next/server";
import { withAuthMiddleware } from "./middlewares/with-auth.middleware";

export function defaultMiddleware() {
  return NextResponse.next();
}

export default withAuthMiddleware(defaultMiddleware, {
  redirectPath: process.env.NEXT_APP_LOGIN_PATH,
});

export const config = { matcher: ["/appointments"] };
