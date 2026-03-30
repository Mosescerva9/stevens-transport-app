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

export function FormLayout({ title, canGoNext, canGoPrevious, onNext, nextLabel = 'Next →', isLoading, children }: FormLayoutProps) {
  const { prevStep, currentStep } = useFormContext();

  return (
    <div>
      {title && <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>}
      {children}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={!canGoPrevious || currentStep === 0}
        >
          ← Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          className="bg-blue-700 hover:bg-blue-800 text-white"
        >
          {isLoading ? 'Saving...' : nextLabel}
        </Button>
      </div>
    </div>
  );
}

// Page-level layout used by page.tsx
export default function AppFormLayout() {
  const { currentStep } = useFormContext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-blue-800 font-bold text-lg">AR</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Allied Refreshment Distributing</h1>
              <p className="text-blue-200 text-sm">Driver Employment Application — Kansas City, MO</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          {currentStep === 0 && <PersonalInfoForm />}
          {currentStep === 1 && <AddressHistoryForm />}
          {currentStep === 2 && <EmploymentHistoryForm />}
          {currentStep === 3 && <DrivingHistoryForm />}
          {currentStep === 4 && <AdditionalQuestionsForm />}
          {currentStep === 5 && <ReviewSubmitForm />}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Allied Refreshment Distributing — Equal Opportunity Employer — All information is kept strictly confidential
        </p>
      </div>
    </div>
  );
}


