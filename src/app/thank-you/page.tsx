"use client";

import { FormProvider } from '@/lib/form-context';
import { ThankYouPage } from '@/components/thank-you-page';

// Mock form data for demonstration
const mockFormData = {
  firstName: 'John',
  lastName: 'Smith',
  middleName: 'Michael',
  socialSecurity: '123-45-6789',
  dateOfBirth: '1990-05-15',
  phone: '(555) 123-4567',
  email: 'john.smith@email.com',
  currentAddress: '123 Main Street',
  currentCity: 'Dallas',
  currentState: 'TX',
  currentZip: '75227',
  currentDuration: '2 years',
  previousAddresses: [
    {
      address: '456 Oak Avenue',
      city: 'Houston',
      state: 'TX',
      zip: '77001',
      duration: '1 year'
    }
  ],
  licenseNumber: 'DL123456789',
  licenseState: 'TX',
  licenseExpiration: '2026-05-15',
  cdlClass: 'A',
  endorsements: ['H', 'N'],
  restrictions: [],
  currentEmployer: 'ABC Trucking Company',
  currentPosition: 'Truck Driver',
  currentStartDate: '2022-01-15',
  currentEndDate: '',
  currentSalary: '$65,000/year',
  currentReasonForLeaving: '',
  previousEmployment: [
    {
      employer: 'XYZ Logistics',
      position: 'Delivery Driver',
      startDate: '2020-06-01',
      endDate: '2021-12-31',
      salary: '$45,000/year',
      reasonForLeaving: 'Career advancement'
    }
  ],
  accidents: [],
  violations: [],
  militaryService: false,
  militaryBranch: '',
  militaryRank: '',
  militaryDates: '',
  submissionResult: {
    id: 'demo-application-id-12345',
    referenceNumber: 'ST-2025-DEMO1',
    submittedAt: new Date().toISOString()
  }
};

// Custom provider that includes the mock data
function MockFormProvider({ children }: { children: React.ReactNode }) {
  const contextValue = {
    formData: mockFormData,
    updateFormData: () => {},
    currentStep: 5,
    setCurrentStep: () => {},
    isStepComplete: () => true,
    totalSteps: 6,
  };

  return (
    <div>
      {/* Use a simplified context for demo */}
      {children}
    </div>
  );
}

export default function ThankYouDemo() {
  return (
    <FormProvider>
      <ThankYouPage />
    </FormProvider>
  );
}
