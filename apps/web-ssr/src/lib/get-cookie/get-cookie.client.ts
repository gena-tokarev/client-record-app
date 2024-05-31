"use client";

import { getCookie } from "cookies-next";

export const getCookieClient = (cookieName: string) => getCookie(cookieName);
