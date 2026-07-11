"use client";

import { useTranslations } from "next-intl";

interface AnalyzeProps {
  mode: "url" | "code";
  setMode: (mode: "url" | "code") => void;
  url: string;
  setUrl: (url: string) => void;
  code: string;
  setCode: (code: string) => void;
  language: string;
  loading?: boolean;
  error?: string | null;
  handleAnalyze: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Analyze = ({
  mode,
  setMode,
  url,
  setUrl,
  code,
  setCode,
  loading,
  error,
  handleAnalyze,
}: AnalyzeProps) => {
  const t = useTranslations("Home");

  const isDisabled = loading || (mode === "url" ? !url.trim() : !code.trim());

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
        {t("title")}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl">
        {t("description")}
      </p>

      {/* Mode toggle */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            mode === "url"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          }`}
        >
          {t("modeUrl")}
        </button>
        <button
          type="button"
          onClick={() => setMode("code")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            mode === "code"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          }`}
        >
          {t("modeCode")}
        </button>
      </div>

      <div className="w-full max-w-lg flex flex-col sm:flex-row gap-2">
        {mode === "url" ? (
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("codePlaceholder")}
            rows={8}
            className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        )}
        <button
          onClick={(e) => handleAnalyze(e)}
          disabled={isDisabled}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto"
        >
          {loading ? t("loading") : t("button")}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
};
