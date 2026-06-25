import type { Metadata } from "next";
import { LegalDoc, H2, P, UL } from "../_doc";
import { CONTACT_EMAIL, LEGAL_ENTITY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Estimating Service Agreement — Mobi Estimates",
  description: "How Mobi Estimates prepares estimates, what they include, and important disclaimers.",
};

export default function EstimatingAgreementPage() {
  return (
    <LegalDoc title="Estimating Service Agreement">
      <P>
        This Estimating Service Agreement describes how {LEGAL_ENTITY} prepares estimating
        deliverables and the assumptions and limitations that apply. It supplements our Terms of
        Service.
      </P>

      <H2>What we deliver</H2>
      <P>
        Depending on the plan or scope you select, deliverables may include quantity takeoffs, labor
        and material pricing, equipment pricing where applicable, marked-up drawings, and a
        proposal-ready estimate summary, delivered in PDF and/or spreadsheet form.
      </P>

      <H2>Important estimating disclaimer</H2>
      <UL>
        <li>Estimates are professional opinions of probable cost prepared for bidding and planning. They are <strong>not guarantees</strong> of final construction cost, and we do not warrant that you will win any bid.</li>
        <li>Estimates are based solely on the documents, drawings, specifications, and instructions you provide and the assumptions stated in the deliverable.</li>
        <li>You are responsible for reviewing each deliverable, verifying quantities and scope, and confirming it fits your project before relying on or submitting it.</li>
        <li>Market pricing, availability, site conditions, addenda, and design changes can materially affect actual costs.</li>
      </UL>

      <H2>Your responsibilities</H2>
      <UL>
        <li>Provide complete, legible plans and clear scope. Incomplete or low-quality documents can affect accuracy and turnaround.</li>
        <li>Communicate deadlines, addenda, and changes promptly through the portal.</li>
        <li>Confirm assumptions, inclusions, and exclusions noted in the deliverable.</li>
      </UL>

      <H2>Turnaround</H2>
      <P>
        Turnaround estimates depend on project size, scope, drawing quality, trade count,
        complexity, and required deliverables. Your delivery schedule is confirmed before work
        begins and is a good-faith target, not a guarantee.
      </P>

      <H2>Revisions</H2>
      <P>
        Reasonable revisions to correct our errors or clarify the delivered scope are included as
        described in your plan or quote. Repricing due to design changes, new addenda, or
        scope changes may be treated as additional work.
      </P>

      <H2>Monthly capacity plans</H2>
      <P>
        Monthly subscriptions reserve estimating capacity and workflow support; they are not
        unlimited-use plans. Larger, multi-trade, incomplete, highly detailed, or accelerated
        projects may count as more than one standard bid. Project classifications and expected
        monthly capacity are confirmed during onboarding.
      </P>

      <H2>Contact</H2>
      <P>
        Questions about a deliverable? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand hover:underline">{CONTACT_EMAIL}</a>.
      </P>
    </LegalDoc>
  );
}
