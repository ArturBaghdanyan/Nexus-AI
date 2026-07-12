import { usePathname, useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";

const supportedLocales = ["en", "am", "ru"];

export const useLocaleSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentLocale = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.find((s) => supportedLocales.includes(s)) ?? "en";
  }, [pathname]);

  const changeLocale = (nextLocale: string) => {
    if (nextLocale === currentLocale) return;

    const segments = pathname.split("/").filter(Boolean);
    const localeIndex = segments.findIndex((s) => supportedLocales.includes(s));

    const nextPath =
      localeIndex >= 0
        ? `/${segments.map((s, i) => (i === localeIndex ? nextLocale : s)).join("/")}`
        : `/${nextLocale}${pathname === "/" ? "" : pathname}`;

    startTransition(() => {
      router.replace(nextPath);
      router.refresh();
    });
  };

  return { currentLocale, changeLocale, isPending };
};
