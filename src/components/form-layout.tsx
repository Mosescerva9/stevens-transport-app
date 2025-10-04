"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useForm } from '@/lib/form-context';
import { ProgressIndicator } from './progress-indicator';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  isLoading?: boolean;
}

export function FormLayout({
  children,
  title,
  canGoNext = false,
  canGoPrevious = true,
  onNext,
  onPrevious,
  nextLabel = "Next",
  isLoading = false,
}: FormLayoutProps) {
  const { currentStep, setCurrentStep } = useForm();

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (canGoNext) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-start">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://ext.same-assets.com/610977211/2678858071.png"
              alt="Stevens Transport"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Company Info */}
          <motion.div
            className="text-right text-sm text-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="font-semibold">Stevens Transport, Inc.</div>
            <div>9757 Military Parkway</div>
            <div>Dallas, TX 75227</div>
            <div>800-333-8595</div>
          </motion.div>
        </div>
      </header>

      {/* Progress Indicator */}
      <ProgressIndicator />

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <motion.div
            className="bg-gray-200 rounded-lg px-6 py-3 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-lg font-medium text-gray-800">{title}</h1>
          </motion.div>

          {/* Form Content */}
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-gray-200">
        <div className="stevens-blue px-6 py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            {/* Previous Button */}
            <motion.button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className={`
                flex items-center gap-2 px-6 py-2 rounded font-medium transition-all duration-200
                ${canGoPrevious
                  ? 'bg-white stevens-blue-text hover:bg-gray-50 hover:shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
              whileHover={canGoPrevious ? { scale: 1.02 } : {}}
              whileTap={canGoPrevious ? { scale: 0.98 } : {}}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={handleNext}
              disabled={!canGoNext || isLoading}
              className={`
                flex items-center gap-2 px-8 py-2 rounded font-medium transition-all duration-200
                ${canGoNext && !isLoading
                  ? 'bg-white stevens-blue-text hover:bg-gray-50 hover:shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
              whileHover={canGoNext && !isLoading ? { scale: 1.02 } : {}}
              whileTap={canGoNext && !isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {nextLabel}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Copyright */}
        <div className="px-6 py-4 text-center text-sm text-gray-600">
          <div className="max-w-4xl mx-auto">
            <a href="#" className="stevens-blue-text hover:underline mr-4 transition-colors">
              Tenstreet Privacy Policy
            </a>
            <span>© Copyright 2006-2025, Tenstreet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
