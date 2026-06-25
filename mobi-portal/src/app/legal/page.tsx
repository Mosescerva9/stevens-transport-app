import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL_EFFECTIVE_DATE, LEGAL_PAGES, SITE_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal & Policies — Mobi Estimates",
  description: "Terms of Service, Estimating Service Agreement, Cancellation & Refund Policy, and Privacy Policy for Mobi Estimates.",
};

export default function LegalIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Legal &amp; policies</h1>
      <p className="mt-2 text-slate-600">
        The terms that govern your use of {SITE_NAME}. Last updated {LEGAL_EFFECTIVE_DATE}.
      </p>
      <ul className="mt-6 space-y-3">
        {LEGAL_PAGES.map((p) => (
          <li key={p.href}>
            <Link href={p.href}
              className="block rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-navy hover:border-brand hover:text-brand">
              {p.title} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
