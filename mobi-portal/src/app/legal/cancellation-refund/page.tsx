import type { Metadata } from "next";
import { LegalDoc, H2, P, UL } from "../_doc";
import { CONTACT_EMAIL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy — Mobi Estimates",
  description: "How to cancel a Mobi Estimates subscription and how refunds work.",
};

export default function CancellationRefundPage() {
  return (
    <LegalDoc title="Cancellation & Refund Policy">
      <H2>Monthly subscriptions</H2>
      <UL>
        <li>Subscriptions are month-to-month and renew automatically until canceled.</li>
        <li>You can cancel anytime from <strong>Subscription &amp; billing</strong> in your portal (which opens the secure Stripe billing portal). Cancellation takes effect at the end of your current billing period.</li>
        <li>You keep access and reserved capacity through the end of the period you&rsquo;ve paid for.</li>
        <li>Because monthly plans reserve dedicated estimating capacity, payments for the current period are generally non-refundable, and unused monthly capacity does not roll over.</li>
      </UL>

      <H2>Per-project estimates</H2>
      <UL>
        <li>Per-project fees are quoted and agreed before work begins.</li>
        <li>Once we have started work on your project, fees are generally non-refundable, as the work reflects time and effort already expended.</li>
        <li>If you cancel a per-project order before work has started, you may be eligible for a full or partial refund.</li>
      </UL>

      <H2>Billing problems &amp; good-faith resolution</H2>
      <P>
        If something went wrong &mdash; a duplicate charge, a billing error, or a deliverable that
        wasn&rsquo;t provided &mdash; contact us and we&rsquo;ll work with you in good faith to make
        it right. We want customers to be satisfied with the service.
      </P>

      <H2>How to cancel or request a refund</H2>
      <P>
        Cancel from your portal&rsquo;s billing page, or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand hover:underline">{CONTACT_EMAIL}</a>{" "}
        with your account details and the reason for your request. We aim to respond within a few
        business days.
      </P>
    </LegalDoc>
  );
}
