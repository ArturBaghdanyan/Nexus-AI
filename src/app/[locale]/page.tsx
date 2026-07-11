"use client";

import Header from "@/src/components/Header/Header";
import Index from "@/src/components/Index";

export default function LocalePage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Header />

      <main className="flex-1 flex items-center justify-center pr-6 text-center">
        <Index />
      </main>
    </div>
  );
}
