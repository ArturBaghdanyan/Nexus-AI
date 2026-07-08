"use client";

import { useTranslations } from "next-intl";

interface AnalyzeProps {
  url: string;
  language: string;
  setUrl: (url: string) => void;
  handleAnalyze: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Analyze = ({
  url,
  setUrl,
  handleAnalyze,
}: AnalyzeProps) => {
  const t = useTranslations("Home");

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        {t("title")}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl">
        {t("description")}
      </p>

      <div className="w-full max-w-lg flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={(e) => handleAnalyze(e)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          {t("button")}
        </button>
      </div>
    </main>
  );
};
