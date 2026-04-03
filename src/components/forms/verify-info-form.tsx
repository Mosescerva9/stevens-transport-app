"use client";

import { useState } from 'react';
import { useFormContext } from '@/lib/form-context';

export default function VerifyInfoForm() {
  const { formData, prevStep, setCurrentStep } = useFormContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSsn] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verified, setVerified] = useState(false);

  const formatSSN = (value: string) => {
    const n = value.replace(/\D/g, '');
    if (n.length <= 3) return n;
    if (n.length <= 5) return `${n.slice(0, 3)}-${n.slice(3)}`;
    return `${n.slice(0, 3)}-${n.slice(3, 5)}-${n.slice(5, 9)}`;
  };

  const formatPhone = (value: string) => {
    const n = value.replace(/\D/g, '');
    if (n.length <= 3) return n;
    if (n.length <= 6) return `(${n.slice(0, 3)}) ${n.slice(3)}`;
    return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6, 10)}`;
  };

  const normalize = (s: string) => s.replace(/\D/g, '');

  const handleVerify = () => {
    const newErrors: Record<string, string> = {};

    if (firstName.trim().toLowerCase() !== formData.firstName.trim().toLowerCase()) {
      newErrors.firstName = 'First name does not match what you entered earlier';
    }
    if (lastName.trim().toLowerCase() !== formData.lastName.trim().toLowerCase()) {
      newErrors.lastName = 'Last name does not match what you entered earlier';
    }
    if (normalize(ssn) !== normalize(formData.socialSecurity)) {
      newErrors.ssn = 'SSN does not match what you entered earlier';
    }
    if (dob !== formData.dateOfBirth) {
      newErrors.dob = 'Date of birth does not match what you entered earlier';
    }
    if (normalize(phone) !== normalize(formData.phone)) {
      newErrors.phone = 'Phone number does not match what you entered earlier';
    }
    if (email.trim().toLowerCase() !== formData.email.trim().toLowerCase()) {
      newErrors.email = 'Email does not match what you entered earlier';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setVerified(true);
    }
  };

  const handleNext = () => {
    setCurrentStep(6);
  };

  return (
    <div>
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 -mx-6 -mt-6 mb-6">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Verify Your Information</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        To ensure accuracy, please re-enter your personal information below. This must match
        exactly what you provided on the first page.
      </p>

      {verified && (
        <div className="p-3 bg-green-50 border border-green-300 text-sm text-green-800 mb-6">
          All information verified successfully. Click &quot;Continue to Review&quot; to proceed.
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={e => { setFirstName(e.target.value); setVerified(false); }}
              placeholder="Re-enter your first name"
              className={`w-full border p-2 text-sm ${errors.firstName ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={e => { setLastName(e.target.value); setVerified(false); }}
              placeholder="Re-enter your last name"
              className={`w-full border p-2 text-sm ${errors.lastName ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Social Security Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ssn}
              onChange={e => { setSsn(formatSSN(e.target.value)); setVerified(false); }}
              placeholder="Re-enter your SSN"
              maxLength={11}
              className={`w-full border p-2 text-sm ${errors.ssn ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.ssn && <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={e => { setDob(e.target.value); setVerified(false); }}
              className={`w-full border p-2 text-sm ${errors.dob ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={e => { setPhone(formatPhone(e.target.value)); setVerified(false); }}
              placeholder="Re-enter your phone number"
              maxLength={14}
              className={`w-full border p-2 text-sm ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setVerified(false); }}
              placeholder="Re-enter your email"
              className={`w-full border p-2 text-sm ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        {!verified ? (
          <button
            type="button"
            onClick={handleVerify}
            disabled={!firstName || !lastName || !ssn || !dob || !phone || !email}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verify Information
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Continue to Review
          </button>
        )}
      </div>
    </div>
  );
}
