import Link from "next/link";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/legal";

/** Shared chrome + typography for a legal document page. */
export function LegalDoc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <Link href="/legal" className="text-sm font-semibold text-slate-500 hover:text-brand">
        ← All policies
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-navy">{title}</h1>
      <p className="mt-1 text-sm text-slate-400">Last updated {LEGAL_EFFECTIVE_DATE}</p>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">{children}</div>
    </article>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 text-lg font-bold text-navy">{children}</h2>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-1 pl-5">{children}</ul>;
}
