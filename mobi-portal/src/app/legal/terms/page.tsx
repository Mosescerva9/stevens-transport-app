import type { Metadata } from "next";
import { LegalDoc, H2, P, UL } from "../_doc";
import { CONTACT_EMAIL, GOVERNING_LAW, LEGAL_ENTITY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service — Mobi Estimates",
  description: "The terms governing use of the Mobi Estimates platform and services.",
};

export default function TermsPage() {
  return (
    <LegalDoc title="Terms of Service">
      <P>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the{" "}
        {LEGAL_ENTITY} website, client portal, and estimating services (collectively, the
        &ldquo;Services&rdquo;). By creating an account or using the Services, you agree to these
        Terms. If you are using the Services on behalf of a company, you represent that you are
        authorized to bind that company.
      </P>

      <H2>1. Accounts</H2>
      <P>
        You must provide accurate information and keep your login credentials secure. You are
        responsible for all activity under your account. Notify us promptly of any unauthorized use.
      </P>

      <H2>2. The Services</H2>
      <P>
        {LEGAL_ENTITY} provides construction cost-estimating and takeoff support based on the
        project documents and information you submit. Estimating deliverables are professional
        opinions prepared for bidding and planning purposes and are subject to the separate{" "}
        <a href="/legal/estimating-agreement" className="font-semibold text-brand hover:underline">
          Estimating Service Agreement
        </a>
        , which is incorporated into these Terms.
      </P>

      <H2>3. Plans, fees, and payment</H2>
      <UL>
        <li>Monthly subscription plans reserve estimating capacity and are billed in advance each month through our payment processor, Stripe.</li>
        <li>Per-project estimates are quoted and billed as agreed before work begins.</li>
        <li>Prices are set on our pricing page or in your written quote. Applicable taxes may apply.</li>
        <li>Subscriptions renew automatically until canceled. See the <a href="/legal/cancellation-refund" className="font-semibold text-brand hover:underline">Cancellation &amp; Refund Policy</a>.</li>
      </UL>

      <H2>4. Your content and our deliverables</H2>
      <P>
        You retain ownership of the plans, drawings, and documents you upload (&ldquo;Your
        Content&rdquo;). You grant {LEGAL_ENTITY} a limited license to use Your Content solely to
        provide the Services. Upon full payment, the completed estimate deliverables we provide to
        you are yours to use for your business. We may retain internal work product and anonymized
        records for quality control and our internal operations.
      </P>

      <H2>5. Acceptable use</H2>
      <P>
        You agree not to misuse the Services, including by uploading unlawful content, infringing
        others&rsquo; intellectual property, attempting to access other customers&rsquo; data, or
        disrupting the platform&rsquo;s security or operation.
      </P>

      <H2>6. Confidentiality</H2>
      <P>
        We treat the project documents you submit as confidential and do not share them with other
        customers. We may use third-party infrastructure providers (such as hosting and storage) to
        operate the Services.
      </P>

      <H2>7. Disclaimers &amp; limitation of liability</H2>
      <P>
        The Services are provided &ldquo;as is.&rdquo; Estimates are not guarantees of final
        construction costs or bid outcomes. To the maximum extent permitted by law, {LEGAL_ENTITY}
        is not liable for indirect, incidental, or consequential damages, and our total liability
        for any claim relating to the Services will not exceed the amount you paid us for the
        Services in the three months before the claim.
      </P>

      <H2>8. Termination</H2>
      <P>
        You may stop using the Services at any time. We may suspend or terminate access for breach
        of these Terms or non-payment. Sections that by their nature should survive termination will
        survive.
      </P>

      <H2>9. Governing law</H2>
      <P>These Terms are governed by the laws of {GOVERNING_LAW}, without regard to conflict-of-laws rules.</P>

      <H2>10. Changes</H2>
      <P>
        We may update these Terms from time to time. Material changes will be reflected by updating
        the &ldquo;Last updated&rdquo; date above, and continued use of the Services constitutes
        acceptance.
      </P>

      <H2>11. Contact</H2>
      <P>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand hover:underline">{CONTACT_EMAIL}</a>.
      </P>
    </LegalDoc>
  );
}
