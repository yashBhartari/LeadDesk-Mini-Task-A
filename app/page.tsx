"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, LeadInput } from "@/lib/schema";
import { createLead } from "@/app/actions";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    setServerError(null);
    const res = await createLead(data);

    if (res.success) {
      setIsSubmitted(true);
      reset();
    } else {
      setServerError(res.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 antialiased font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-slate-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-mono font-bold text-xs shadow-sm">
              L
            </div>
            <span className="font-semibold text-base tracking-tight text-slate-900 dark:text-zinc-100">
              LeadDesk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Online
            </span>

            {/* Light/Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md border border-slate-200 dark:border-zinc-800">
              Inbound Capture
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 leading-[1.1]">
              Accelerate your client intake.
            </h1>
            
            <p className="text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
              Submit your inquiry directly to our lead management pipeline. We review project details and respond within 24 hours.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300 font-medium">
                <div className="h-6 w-6 rounded-full bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>End-to-end validated pipeline</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300 font-medium">
                <div className="h-6 w-6 rounded-full bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>Instant routing to admin workspace</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/60 dark:shadow-none p-8 sm:p-10">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-semibold">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Inquiry Received</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                      Your lead has been validated and saved to the LeadDesk workspace.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-4 transition"
                  >
                    Submit another lead &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {serverError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium">
                      {serverError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all ${
                        errors.name
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100 focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-slate-900/5 dark:focus:ring-zinc-100/5"
                      }`}
                      placeholder="Alex Rivera"
                    />
                    {errors.name && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Work Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all ${
                        errors.email
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100 focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-slate-900/5 dark:focus:ring-zinc-100/5"
                      }`}
                      placeholder="alex@company.com"
                    />
                    {errors.email && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Budget Range
                    </label>
                    <select
                      {...register("budget_range")}
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 outline-none transition-all ${
                        errors.budget_range
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100 focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-slate-900/5 dark:focus:ring-zinc-100/5"
                      }`}
                    >
                      <option value="" className="bg-white dark:bg-zinc-900">Select an estimated budget</option>
                      <option value="<$1k" className="bg-white dark:bg-zinc-900">Under $1,000</option>
                      <option value="$1k-$5k" className="bg-white dark:bg-zinc-900">$1,000 – $5,000</option>
                      <option value="$5k-$10k" className="bg-white dark:bg-zinc-900">$5,000 – $10,000</option>
                      <option value="$10k+" className="bg-white dark:bg-zinc-900">$10,000+</option>
                    </select>
                    {errors.budget_range && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.budget_range.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Project Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all resize-none ${
                        errors.message
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100 focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-slate-900/5 dark:focus:ring-zinc-100/5"
                      }`}
                      placeholder="Briefly describe project scope and timeline..."
                    />
                    {errors.message && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium text-sm rounded-xl shadow-md transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/20 dark:border-zinc-900/20 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Project Inquiry</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Trust Stats Section */}
      <section className="w-full border-y border-slate-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-zinc-100">500+</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Leads Processed</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-zinc-100">{'<24h'}</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Avg Response Time</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-zinc-100">98%</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Satisfaction Rate</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-zinc-100">256-bit</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Encryption Standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md border border-slate-200 dark:border-zinc-800">
              Platform Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Why LeadDesk?
            </h2>
            <p className="text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto">
              A modern lead management platform built for agencies and consultancies that value speed and precision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-slate-700 dark:text-zinc-300 group-hover:bg-slate-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-zinc-100 mb-2">Smart Capture</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                Intake forms with real-time validation ensure clean, structured lead data every time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-slate-700 dark:text-zinc-300 group-hover:bg-slate-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-zinc-100 mb-2">Data Integrity</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                Zod-powered schema validation ensures every submission meets your quality standards.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-slate-700 dark:text-zinc-300 group-hover:bg-slate-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-zinc-100 mb-2">Instant Routing</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                Leads are automatically routed to the admin workspace, ready for immediate review.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-slate-700 dark:text-zinc-300 group-hover:bg-slate-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-zinc-100 mb-2">Pipeline Analytics</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                Track lead statuses, response rates, and conversion metrics from one central dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 sm:py-28 bg-white/50 dark:bg-zinc-900/50 border-y border-slate-200/80 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md border border-slate-200 dark:border-zinc-800">
              Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              How It Works
            </h2>
            <p className="text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto">
              Three simple steps from inquiry to connection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative text-center md:text-left">
              <div className="hidden md:block absolute top-0 left-16 w-full h-px bg-slate-200 dark:bg-zinc-800" />
              <div className="relative z-10 flex md:block items-center gap-5 md:space-y-5">
                <div className="shrink-0 h-14 w-14 rounded-2xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-lg font-bold shadow-md">
                  01
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-zinc-100">Submit Inquiry</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Fill out the intake form with your project details, budget range, and contact information.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center md:text-left">
              <div className="hidden md:block absolute top-0 left-16 w-full h-px bg-slate-200 dark:bg-zinc-800" />
              <div className="relative z-10 flex md:block items-center gap-5 md:space-y-5">
                <div className="shrink-0 h-14 w-14 rounded-2xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-lg font-bold shadow-md">
                  02
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-zinc-100">Validate &amp; Route</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Our pipeline validates the data and instantly routes it to the admin workspace.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center md:text-left">
              <div className="relative z-10 flex md:block items-center gap-5 md:space-y-5">
                <div className="shrink-0 h-14 w-14 rounded-2xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-lg font-bold shadow-md">
                  03
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-zinc-100">Get Connected</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Our team reviews and responds within 24 hours with a tailored proposal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden bg-slate-900 dark:bg-zinc-900 rounded-3xl border border-slate-700 dark:border-zinc-800 shadow-2xl shadow-slate-900/20 dark:shadow-none px-8 py-16 sm:px-16 sm:py-20 text-center">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/50 dark:bg-zinc-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider bg-slate-800 dark:bg-zinc-800 px-3 py-1 rounded-md border border-slate-700 dark:border-zinc-700">
                Get Started Today
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.1]">
                Ready to accelerate your client intake?
              </h2>
              <p className="text-base text-slate-300 max-w-lg mx-auto">
                Join agencies and consultancies that use LeadDesk to capture, validate, and manage leads with confidence.
              </p>
              <div className="pt-4">
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm rounded-xl shadow-lg transition-all active:scale-[0.99]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                  </svg>
                  Submit Your Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}