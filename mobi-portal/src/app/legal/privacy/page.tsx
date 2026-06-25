import type { Metadata } from "next";
import { LegalDoc, H2, P, UL } from "../_doc";
import { CONTACT_EMAIL, LEGAL_ENTITY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — Mobi Estimates",
  description: "How Mobi Estimates collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc title="Privacy Policy">
      <P>
        This Privacy Policy explains what information {LEGAL_ENTITY} collects, how we use it, and
        the choices you have. It applies to our website and client portal.
      </P>

      <H2>Information we collect</H2>
      <UL>
        <li><strong>Account &amp; company details</strong> you provide: name, email, phone (optional), company name, and onboarding preferences.</li>
        <li><strong>Project content</strong> you upload: plans, drawings, specifications, and scope notes.</li>
        <li><strong>Billing information:</strong> handled by our payment processor, Stripe. We do not store your full card number on our systems.</li>
        <li><strong>Usage data:</strong> basic technical logs needed to operate and secure the Services.</li>
      </UL>

      <H2>How we use it</H2>
      <UL>
        <li>To provide estimating services and deliver your estimates.</li>
        <li>To manage your account, subscription, and billing.</li>
        <li>To communicate with you about your projects and account.</li>
        <li>To maintain the security, integrity, and quality of the Services.</li>
      </UL>

      <H2>How it&rsquo;s shared</H2>
      <P>
        We do not sell your personal information. We share data only with service providers that
        help us run the platform &mdash; for example, hosting and database/storage (Supabase),
        deployment (Vercel), and payments (Stripe) &mdash; and only as needed to provide the
        Services, or where required by law. Your project documents are kept confidential and are not
        shared with other customers.
      </P>

      <H2>Data storage &amp; security</H2>
      <P>
        Your data is stored with reputable cloud providers. Project files are kept in private
        storage and accessed through short-lived, signed links. Access is restricted so that you can
        see only your own company&rsquo;s data. No system is perfectly secure, but we take
        reasonable measures to protect your information.
      </P>

      <H2>Retention</H2>
      <P>
        We keep your information for as long as your account is active and as needed to provide the
        Services, comply with legal obligations, resolve disputes, and enforce agreements.
      </P>

      <H2>Your choices</H2>
      <P>
        You can update your account information in the portal or request access to or deletion of
        your personal information by contacting us. We&rsquo;ll respond consistent with applicable
        law.
      </P>

      <H2>Contact</H2>
      <P>
        Privacy questions? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand hover:underline">{CONTACT_EMAIL}</a>.
      </P>
    </LegalDoc>
  );
}
