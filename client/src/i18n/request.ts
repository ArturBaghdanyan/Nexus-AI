import { getRequestConfig } from "next-intl/server";

const locales = ["en", "am", "ru"];

export default getRequestConfig(async ({ locale }) => {
  const validatedLocale = locales.includes(locale as string)
    ? (locale as string)
    : "en";
  return {
    locale: validatedLocale,
    messages: (await import(`../messages/${validatedLocale}.json`)).default,
  };
});
