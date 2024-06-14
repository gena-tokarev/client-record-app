import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export const getCookieServer = async (cookieName: string) =>
  getCookie(cookieName, { cookies });
