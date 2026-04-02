"use client";

import { useFormContext } from '@/lib/form-context';
import { ProgressIndicator } from './progress-indicator';
import { PersonalInfoForm } from './forms/personal-info-form';
import { AddressHistoryForm } from './forms/address-history-form';
import { DrivingHistoryForm } from './forms/driving-history-form';
import { EmploymentHistoryForm } from './forms/employment-history-form';
import AdditionalQuestionsForm from './forms/additional-questions-form';
import ReviewSubmitForm from './forms/review-submit-form';
import { Button } from './ui/button';
import React from 'react';

const steps = [
  'Personal Info',
  'Address History',
  'Employment',
  'Driving History',
  'Additional Questions',
  'Review & Submit',
];

// Section-level FormLayout used by individual form step components
interface FormLayoutProps {
  title?: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  onNext?: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
  nextLabel?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function FormLayout({ title, canGoNext, canGoPrevious, onNext, nextLabel = 'Next', isLoading, children }: FormLayoutProps) {
  const { prevStep, currentStep } = useFormContext();

  return (
    <div>
      {title && (
        <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 -mx-6 -mt-6 mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{title}</h2>
        </div>
      )}
      {children}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          disabled={!canGoPrevious || currentStep === 0}
          className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : nextLabel}
        </button>
      </div>
    </div>
  );
}

// Page-level layout used by page.tsx
export default function AppFormLayout() {
  const { currentStep } = useFormContext();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Allied Refreshment Distributing</h1>
          <p className="text-sm text-gray-500">Kansas City, MO &nbsp;|&nbsp; hiring@alliedrefreshmentdistributing.com</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <ProgressIndicator steps={steps} currentStep={currentStep} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="border border-gray-300 bg-white p-6">
          {currentStep === 0 && <PersonalInfoForm />}
          {currentStep === 1 && <AddressHistoryForm />}
          {currentStep === 2 && <EmploymentHistoryForm />}
          {currentStep === 3 && <DrivingHistoryForm />}
          {currentStep === 4 && <AdditionalQuestionsForm />}
          {currentStep === 5 && <ReviewSubmitForm />}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 pb-4">
          Allied Refreshment Distributing &mdash; Equal Opportunity Employer &mdash; All information is kept strictly confidential
        </p>
      </div>
    </div>
  );
}
