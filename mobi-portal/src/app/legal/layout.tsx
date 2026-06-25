import Link from "next/link";
import { CONTACT_EMAIL, LEGAL_PAGES } from "@/lib/legal";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-navy">
            MOBI <span className="font-semibold text-brand">Estimates</span>
          </Link>
          <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-brand">
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-6 text-sm text-slate-500">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_PAGES.map((p) => (
              <Link key={p.href} href={p.href} className="hover:text-brand">{p.title}</Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand">{CONTACT_EMAIL}</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
