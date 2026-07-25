"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg border border-slate-200 dark:border-zinc-800" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        /* Sun Icon */
        <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.414 1.415l-.708-.707a1 1 0 010-1.415zM17 9a1 1 0 100 2h1a1 1 0 100-2h-1zm-2.78 5.657a1 1 0 010 1.415l-.707.707a1 1 0 01-1.415-1.414l.707-.708a1 1 0 011.415 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.657-2.343a1 1 0 011.414 0l.708.707a1 1 0 01-1.415 1.415l-.707-.708a1 1 0 010-1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm2.343-5.657a1 1 0 010-1.415l.707-.707a1 1 0 011.415 1.414l-.708.708a1 1 0 01-1.414 0zM10 6a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        /* Moon Icon */
        <svg className="w-4 h-4 text-slate-700 fill-current" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
