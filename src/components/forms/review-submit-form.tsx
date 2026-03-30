"use client";

import { useFormContext } from '@/lib/form-context';
import { Button } from '../ui/button';
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
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
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
      <h2 className="text-xl font-bold text-gray-900 mb-1">Review Your Application</h2>
      <p className="text-gray-500 text-sm mb-6">Please review your information before submitting.</p>

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
            (formData.licenseImageFront ? '✅ Front uploaded' : '❌ Front missing') + ' | ' +
            (formData.licenseImageBack ? '✅ Back uploaded' : '❌ Back missing')
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
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={submitting}>← Back</Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-medium text-gray-700 text-xs uppercase tracking-wide">{title}</div>
      <div className="p-4 space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-32 shrink-0">{label}:</span>
      <span className="text-gray-900">{value || '—'}</span>
    </div>
  );
}
