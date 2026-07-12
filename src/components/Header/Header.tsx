"use client";
import { useHeaderAuth } from "../../hooks/useHeaderAuth";
import { useLocaleSwitcher } from "../../hooks/useLocalSwitcher";
import { useState, useRef } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "am", label: "Հայերեն" },
];

const Header = () => {
  const { user, loading, signOut } = useHeaderAuth();
  const { currentLocale, changeLocale, isPending } = useLocaleSwitcher();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (loading || !user) return null;

  const selected =
    languages.find((l) => l.code === currentLocale) || languages[0];

  return (
    <header className="bg-white dark:bg-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Nexus AI
        </h1>

        <div ref={dropdownRef} className="relative flex gap-x-5">
          <button
            onClick={() => setOpen(!open)}
            disabled={isPending}
            className="flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200 disabled:opacity-60 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {selected.label}
          </button>

          <button
            onClick={signOut}
            className="hover:text-red-500 cursor-pointer"
          >
            Sign out
          </button>

          {open && (
            <div className="absolute right-[76px] top-[32px] mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-black border border-gray-300 dark:border-gray-600">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer "
                  onClick={() => {
                    changeLocale(lang.code);
                    setOpen(false);
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
