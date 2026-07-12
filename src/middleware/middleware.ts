import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "am", "ru"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(am|en|ru)/:path*"],
};
