"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { updateLeadStatus } from "@/app/actions";
import { Lead } from "@/lib/schema";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "New" | "Contacted" | "Closed") => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    await updateLeadStatus(id, newStatus);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    closed: leads.filter((l) => l.status === "Closed").length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 antialiased font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors duration-200">
      {/* Workspace Header */}
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-slate-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-mono font-bold text-xs shadow-sm">
              L
            </div>
            <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-zinc-100">
              LeadDesk Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live Sync
            </div>

            {/* Light/Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {/* Page Heading & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-zinc-100">
              Lead Management
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Review, filter, and modify inbound prospect statuses.
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-72 px-3.5 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 outline-none focus:border-slate-900 dark:focus:border-zinc-100 focus:ring-2 focus:ring-slate-900/5 dark:focus:ring-zinc-100/5 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              Total
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">{counts.total}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              New
            </span>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{counts.new}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Contacted
            </span>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{counts.contacted}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Closed
            </span>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{counts.closed}</p>
          </div>
        </div>

        {/* Data Table Container */}
        {loading ? (
          <div className="text-center py-20 text-xs text-slate-400 dark:text-zinc-500">
            Loading pipeline metrics...
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 dark:bg-zinc-950/50 border-b border-slate-200/80 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 font-medium">
                  <tr>
                    <th className="py-3 px-4">Contact Detail</th>
                    <th className="py-3 px-4">Budget</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400 dark:text-zinc-500">
                        No submissions match the current query.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 dark:text-zinc-100">{lead.name}</div>
                          <div className="text-slate-500 dark:text-zinc-400 text-[11px] font-mono mt-0.5">{lead.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 rounded text-[11px] font-mono font-medium">
                            {lead.budget_range}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-300 max-w-sm truncate">
                          {lead.message}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(
                                lead.id,
                                e.target.value as "New" | "Contacted" | "Closed"
                              )
                            }
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md outline-none border cursor-pointer transition-all dark:bg-zinc-900 ${
                              lead.status === "New"
                                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                                : lead.status === "Contacted"
                                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                                : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                            }`}
                          >
                            <option value="New" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100">
                              New
                            </option>
                            <option value="Contacted" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100">
                              Contacted
                            </option>
                            <option value="Closed" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100">
                              Closed
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}