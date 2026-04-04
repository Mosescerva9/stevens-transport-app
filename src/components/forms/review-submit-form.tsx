"use client";

import { useFormContext } from '@/lib/form-context';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewSubmitForm() {
  const { formData, prevStep } = useFormContext();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      // Strip large base64 image data from main submission to stay under Vercel's 4.5MB body limit
      const { licenseImageFront, licenseImageBack, ...formDataWithoutImages } = formData;

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataWithoutImages),
      });
      const result = await res.json();
      if (result.success) {
        // Send images separately if they exist
        if (licenseImageFront || licenseImageBack) {
          try {
            await fetch(`/api/applications/${result.data.id}/images`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                licenseImageFront: licenseImageFront || '',
                licenseImageBack: licenseImageBack || '',
              }),
            });
          } catch {
            // Images failed but application was saved — don't block the user
            console.warn('License images could not be uploaded, but application was saved.');
          }
        }
        router.push(`/thank-you?ref=${result.data.referenceNumber}`);
      } else {
        setError(result.error || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 -mx-6 -mt-6 mb-6">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Review Your Application</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">Please review your information before submitting.</p>

      <div className="space-y-4 text-sm">
        <Section title="Personal Information">
          <Row label="Name" value={`${formData.firstName} ${formData.middleName || ''} ${formData.lastName}`} />
          <Row label="DOB" value={formData.dateOfBirth} />
          <Row label="Phone" value={formData.phone} />
          <Row label="Email" value={formData.email} />
          <Row label="SSN" value={formData.socialSecurity ? '***-**-' + formData.socialSecurity.slice(-4) : ''} />
        </Section>

        <Section title="Current Address">
          <Row label="Address" value={`${formData.currentAddress}, ${formData.currentCity}, ${formData.currentState} ${formData.currentZip}`} />
          <Row label="Duration" value={formData.currentDuration} />
          <Row label="3+ Years?" value={formData.livedHereThreeYears ? 'Yes' : 'No'} />
        </Section>

        <Section title="Driver's License">
          <Row label="License #" value={formData.licenseNumber} />
          <Row label="State" value={formData.licenseState} />
          <Row label="Expiration" value={formData.licenseExpiration} />
          <Row label="CDL Class" value={formData.cdlClass || 'None'} />
          <Row label="License Images" value={
            (formData.licenseImageFront ? 'Front uploaded' : 'Front missing') + ' | ' +
            (formData.licenseImageBack ? 'Back uploaded' : 'Back missing')
          } />
        </Section>

        <Section title="Current Employment">
          <Row label="Employer" value={formData.currentEmployer} />
          <Row label="Position" value={formData.currentPosition} />
          <Row label="Start Date" value={formData.currentStartDate} />
        </Section>

        <Section title="Additional">
          <Row label="Prior Convictions" value={formData.hasConvictions ? 'Yes' : 'No'} />
          <Row label="Can lift 50+ lbs" value={formData.canLiftFiftyLbs ? 'Yes' : 'No'} />
          <Row label="Signature" value={formData.signature || 'Not signed'} />
        </Section>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          disabled={submitting}
          className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="px-8 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-40"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-300 overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{title}</span>
      </div>
      <div className="p-4 space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-32 shrink-0 text-xs uppercase font-medium">{label}:</span>
      <span className="text-gray-900 text-sm">{value || '—'}</span>
    </div>
  );
}
