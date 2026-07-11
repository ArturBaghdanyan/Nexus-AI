"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

const supportedLocales = ["en", "am", "ru"];

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "am", label: "Հայերեն" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const localeSegment = segments.find((segment) =>
      supportedLocales.includes(segment),
    );
    return localeSegment ?? "en";
  }, [pathname]);

  const selected =
    languages.find((language) => language.code === currentLocale) ||
    languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLocalizedPath = useMemo(() => {
    return (nextLocale: string) => {
      const segments = pathname.split("/").filter(Boolean);
      const localeIndex = segments.findIndex((segment) =>
        supportedLocales.includes(segment),
      );

      if (localeIndex >= 0) {
        segments[localeIndex] = nextLocale;
        return `/${segments.join("/")}`;
      }

      return pathname === "/" ? `/${nextLocale}` : `/${nextLocale}${pathname}`;
    };
  }, [pathname]);

  const handleLanguageChange = (languageCode: string) => {
    if (languageCode === currentLocale) {
      setOpen(false);
      return;
    }

    setOpen(false);

    const nextPath = getLocalizedPath(languageCode);

    startTransition(() => {
      router.replace(nextPath);
      router.refresh(); 
    });
  };

  return (
    <>
      <header className="bg-white dark:bg-black shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Nexus AI
          </h1>
          <div ref={dropdownRef} className="relative inline-block">
            <button
              type="button"
              onClick={() => setOpen((currentOpen) => !currentOpen)}
              disabled={isPending}
              className="flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200 disabled:opacity-60 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {selected.label}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-black border border-gray-300 dark:border-gray-600">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <span>{language.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;