"use client";

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from '@/lib/form-context';

const steps = [
  { id: 0, title: 'Introduction', description: 'Getting Started' },
  { id: 1, title: 'Personal Info', description: 'Basic Information' },
  { id: 2, title: 'Address History', description: 'Residence History' },
  { id: 3, title: 'Driving Record', description: 'License & History' },
  { id: 4, title: 'Employment', description: 'Work History' },
];

export function ProgressIndicator() {
  const { currentStep, isStepComplete } = useForm();

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = isStepComplete(step.id);
            const isAccessible = index <= currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex items-center">
                  <motion.div
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                          ? 'bg-blue-600 border-blue-600 text-white stevens-blue'
                          : isAccessible
                            ? 'bg-white border-gray-300 text-gray-600'
                            : 'bg-gray-100 border-gray-200 text-gray-400'
                      }
                    `}
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isCompleted ? '#38bc52' : isActive ? '#255682' : undefined
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Check className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <span className="text-sm font-medium">{step.id + 1}</span>
                    )}
                  </motion.div>

                  {/* Step Text */}
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${isActive ? 'text-blue-600 stevens-blue-text' : 'text-gray-900'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="relative">
                      <div className="h-0.5 bg-gray-200 w-full"></div>
                      <motion.div
                        className="h-0.5 stevens-blue absolute top-0 left-0"
                        initial={{ width: 0 }}
                        animate={{
                          width: isStepComplete(step.id) ? '100%' : '0%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Step Info */}
        <div className="sm:hidden mt-3 text-center">
          <div className="text-sm font-medium stevens-blue-text">
            {steps[currentStep].title}
          </div>
          <div className="text-xs text-gray-500">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].description}
          </div>
        </div>
      </div>
    </div>
  );
}
