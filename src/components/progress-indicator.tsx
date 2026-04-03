"use client";

import { useForm } from '@/lib/form-context';

interface ProgressIndicatorProps {
  steps?: string[];
  currentStep?: number;
}

export function ProgressIndicator({ steps: stepsProp, currentStep: currentStepProp }: ProgressIndicatorProps) {
  const { currentStep: ctxStep } = useForm();

  const currentStep = currentStepProp !== undefined ? currentStepProp : ctxStep;

  const defaultSteps = [
    'Welcome',
    'Personal Info',
    'Employment',
    'Driving Record',
    'Additional Questions',
    'Review & Submit',
  ];

  const steps = stepsProp || defaultSteps;
  const percentage = Math.round(((currentStep) / steps.length) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-700">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </span>
        <span className="text-xs font-medium text-gray-500">{percentage}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 h-2">
        <div
          className="bg-blue-600 h-2 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
