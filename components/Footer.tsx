export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
        <p className="flex items-center gap-1.5">
          <span>Built for</span>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-900 dark:text-zinc-100 underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Digital Heroes Training Task
          </a>
        </p>
        <p className="font-mono text-slate-400 dark:text-zinc-500 text-[11px]">LeadDesk Mini v1.0</p>
      </div>
    </footer>
  );
}