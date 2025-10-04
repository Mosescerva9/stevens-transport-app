"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the form data structure
export interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  middleName: string;
  socialSecurity: string;
  dateOfBirth: string;
  phone: string;
  email: string;

  // Current Address
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentZip: string;
  currentDuration: string;
  livedHereThreeYears: boolean;

  // Previous Addresses (last 3 years)
  previousAddresses: Array<{
    address: string;
    city: string;
    state: string;
    zip: string;
    duration: string;
  }>;

  // Driver License Information
  licenseNumber: string;
  licenseState: string;
  licenseExpiration: string;
  cdlClass: string;
  endorsements: string[];
  restrictions: string[];

  // Employment History
  currentEmployer: string;
  currentPosition: string;
  currentStartDate: string;
  currentEndDate: string;
  currentSalary: string;
  currentReasonForLeaving: string;

  previousEmployment: Array<{
    employer: string;
    position: string;
    startDate: string;
    endDate: string;
    salary: string;
    reasonForLeaving: string;
  }>;

  // Driving History
  accidents: Array<{
    date: string;
    description: string;
    fatalities: boolean;
    injuries: boolean;
  }>;

  violations: Array<{
    date: string;
    violation: string;
    location: string;
  }>;

  // Military History
  militaryService: boolean;
  militaryBranch: string;
  militaryRank: string;
  militaryDates: string;

  // Submission Result
  submissionResult?: {
    id: string;
    referenceNumber: string;
    submittedAt: string;
  };
}

interface FormContextType {
  formData: FormData;
  updateFormData: (section: string, data: unknown) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isStepComplete: (step: number) => boolean;
  totalSteps: number;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Initial form data
const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  middleName: '',
  socialSecurity: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  currentAddress: '',
  currentCity: '',
  currentState: '',
  currentZip: '',
  currentDuration: '',
  livedHereThreeYears: false,
  previousAddresses: [],
  licenseNumber: '',
  licenseState: '',
  licenseExpiration: '',
  cdlClass: '',
  endorsements: [],
  restrictions: [],
  currentEmployer: '',
  currentPosition: '',
  currentStartDate: '',
  currentEndDate: '',
  currentSalary: '',
  currentReasonForLeaving: '',
  previousEmployment: [],
  accidents: [],
  violations: [],
  militaryService: false,
  militaryBranch: '',
  militaryRank: '',
  militaryDates: '',
  submissionResult: undefined,
};

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const updateFormData = (section: string, data: unknown) => {
    setFormData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0: // Welcome/Introduction
        return true;
      case 1: // Personal Information
        return !!(formData.firstName && formData.lastName && formData.socialSecurity && formData.dateOfBirth);
      case 2: // Address History
        // Check if current address is complete
        const currentAddressComplete = !!(formData.currentAddress && formData.currentCity && formData.currentState);

        // If they've lived at current address for 3+ years, no previous addresses needed
        if (formData.livedHereThreeYears) {
          return currentAddressComplete;
        }

        // Otherwise, need at least one complete previous address
        const completeAddresses = formData.previousAddresses.filter(addr =>
          addr.address.trim() && addr.city.trim() && addr.state.trim() && addr.zip.trim() && addr.duration.trim()
        );
        return currentAddressComplete && completeAddresses.length >= 1;
      case 3: // Driver License & Driving History
        return !!(formData.licenseNumber && formData.licenseState);
      case 4: // Employment History
        // Check if current employment is complete AND at least one previous employment is complete
        const currentEmploymentComplete = !!(formData.currentEmployer && formData.currentPosition);
        const completeEmployment = formData.previousEmployment.filter(emp =>
          emp.employer.trim() && emp.position.trim() && emp.startDate.trim() &&
          emp.endDate.trim() && emp.salary.trim() && emp.reasonForLeaving.trim()
        );
        return currentEmploymentComplete && completeEmployment.length >= 1;
      default:
        return false;
    }
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      isStepComplete,
      totalSteps,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
