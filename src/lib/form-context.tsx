"use client";

import React, { createContext, useContext, useState } from 'react';

export interface FormData {
  // Personal
  firstName: string;
  lastName: string;
  middleName?: string;
  socialSecurity: string;
  dateOfBirth: string;
  phone: string;
  alternatePhone?: string;
  email: string;

  // Address
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentZip: string;
  currentDuration: string;
  livedHereThreeYears: boolean;
  previousAddresses: Array<{
    address: string; city: string; state: string; zip: string; duration: string;
  }>;

  // License
  licenseNumber: string;
  licenseState: string;
  licenseExpiration: string;
  cdlClass?: string;
  endorsements: string[];
  restrictions: string[];
  licenseImageFront?: string;
  licenseImageBack?: string;

  // Employment
  currentEmployer: string;
  currentPosition: string;
  currentStartDate: string;
  currentEndDate?: string;
  currentSalary: string;
  currentReasonForLeaving?: string;
  currentSupervisorName?: string;
  currentSupervisorPhone?: string;
  canContactCurrentEmployer: boolean;
  previousEmployment: Array<{
    employer: string; position: string; startDate: string; endDate: string;
    salary: string; reasonForLeaving: string; supervisorName?: string;
    supervisorPhone?: string; canContact?: boolean;
  }>;

  // Driving history
  accidents: Array<{
    date: string; description: string; fatalities: boolean; injuries: boolean;
    location?: string; charges?: string;
  }>;
  violations: Array<{
    date: string; violation: string; location: string; penalty?: string;
  }>;

  // Military
  militaryService: boolean;
  militaryBranch?: string;
  militaryRank?: string;
  militaryDates?: string;
  militaryDuties?: string;

  // Additional questions
  hasConvictions: boolean;
  convictionsDetails?: string;
  hasBeenBonded: boolean;
  bondedDetails?: string;
  canLiftFiftyLbs: boolean;
  hasPhysicalLimits: boolean;
  physicalLimitsDetails?: string;
  availableWeekends: boolean;
  availableOvernight: boolean;
  expectedPay?: string;
  howHeardAboutUs?: string;
  referredBy?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  signature?: string;
  signatureDate?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submissionResult?: any;
}

const defaultFormData: FormData = {
  firstName: '', lastName: '', socialSecurity: '', dateOfBirth: '', phone: '', email: '',
  currentAddress: '', currentCity: '', currentState: '', currentZip: '',
  currentDuration: '', livedHereThreeYears: false, previousAddresses: [],
  licenseNumber: '', licenseState: '', licenseExpiration: '', endorsements: [], restrictions: [],
  currentEmployer: '', currentPosition: '', currentStartDate: '', currentSalary: '',
  canContactCurrentEmployer: true, previousEmployment: [],
  accidents: [], violations: [],
  militaryService: false,
  hasConvictions: false, hasBeenBonded: false, canLiftFiftyLbs: false,
  hasPhysicalLimits: false, availableWeekends: false, availableOvernight: false,
};

interface FormContextType {
  formData: FormData;
  // Supports both (key, value) and (data: Partial<FormData>) calling conventions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFormData: (keyOrData: string | Partial<FormData>, value?: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
  isStepComplete: (step: number) => boolean;
}

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 7;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFormData = (keyOrData: string | Partial<FormData>, value?: any) => {
    if (typeof keyOrData === 'string') {
      setFormData(prev => ({ ...prev, [keyOrData]: value }));
    } else {
      setFormData(prev => ({ ...prev, ...keyOrData }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const isStepComplete = (step: number) => step < currentStep;

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      nextStep,
      prevStep,
      totalSteps,
      isStepComplete,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used within FormProvider');
  return ctx;
}


export const useForm = useFormContext;
