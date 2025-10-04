"use client";

import { FormProvider, useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { PersonalInfoForm } from '@/components/forms/personal-info-form';
import { AddressHistoryForm } from '@/components/forms/address-history-form';
import { DrivingHistoryForm } from '@/components/forms/driving-history-form';
import { EmploymentHistoryForm } from '@/components/forms/employment-history-form';
import { ThankYouPage } from '@/components/thank-you-page';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Introduction/Welcome Page Component
function IntroductionPage() {
  const { setCurrentStep } = useForm();

  const handleNext = () => {
    setCurrentStep(1);
  };

  return (
    <FormLayout
      title="Driver Application - Getting Started"
      canGoNext={true}
      canGoPrevious={false}
      onNext={handleNext}
      nextLabel="Start Application"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-700 leading-relaxed">
            Thank you for your interest in Stevens Transport, Inc.. To apply for a driving
            position, please complete our qualification form. Incomplete information will
            delay processing of your qualification form or prevent it from being submitted.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-gray-700 leading-relaxed">
            In compliance with Federal and State equal employment opportunity laws,
            qualified candidate are considered for all positions without regard to race, color,
            religion, sex, national origin, age, marital status, veteran status, non-job related
            disability, or any other protected group status.
          </p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            To fill out this form, you will need to know the following:
          </h2>

          <div className="space-y-3">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Check className="h-5 w-5 stevens-green flex-shrink-0" />
              <span className="text-gray-700">Social Security Number</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Check className="h-5 w-5 stevens-green flex-shrink-0" />
              <span className="text-gray-700">Home address history for the past 3 years</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Check className="h-5 w-5 stevens-green flex-shrink-0" />
              <span className="text-gray-700">Current driver license number and driver license history for the past 3 years</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Check className="h-5 w-5 stevens-green flex-shrink-0" />
              <span className="text-gray-700">Employment history up to 10 years</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Check className="h-5 w-5 stevens-green flex-shrink-0" />
              <span className="text-gray-700">History of traffic accidents, violations and/or convictions from the last 3 years (including DUI or reckless driving conviction and license suspension)</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Check className="h-5 w-5 stevens-green flex-shrink-0" />
              <span className="text-gray-700">Military history (if applicable)</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <p className="text-gray-700 text-sm">
            Required entry fields are followed by <span className="text-red-500 font-bold">*</span>, meaning you must provide the requested
            information to continue. If you encounter any errors during this process and
            cannot continue, please contact us at <span className="font-semibold">800-333-8595</span>.
          </p>
        </motion.div>

        <motion.div
          className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <p className="text-blue-800 text-sm">
            <strong>Estimated Time:</strong> This application takes approximately 15-20 minutes to complete.
            Your progress will be saved as you move through each section.
          </p>
        </motion.div>
      </div>
    </FormLayout>
  );
}

// Main Form Router Component
function FormRouter() {
  const { currentStep } = useForm();

  switch (currentStep) {
    case 0:
      return <IntroductionPage />;
    case 1:
      return <PersonalInfoForm />;
    case 2:
      return <AddressHistoryForm />;
    case 3:
      return <DrivingHistoryForm />;
    case 4:
      return <EmploymentHistoryForm />;
    case 5:
      return <ThankYouPage />;
    default:
      return <IntroductionPage />;
  }
}

// Main App Component
export default function Home() {
  return (
    <FormProvider>
      <FormRouter />
    </FormProvider>
  );
}
