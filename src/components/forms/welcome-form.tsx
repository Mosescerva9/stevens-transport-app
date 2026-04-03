"use client";

import { useFormContext } from '@/lib/form-context';

export default function WelcomeForm() {
  const { nextStep } = useFormContext();

  return (
    <div>
      <p className="text-sm text-gray-700 mb-4">
        Thank you for your interest in Allied Refreshment Distributing. To apply for a driving
        position, please complete our qualification form. Incomplete information will
        delay processing of your qualification form or prevent it from being submitted.
      </p>

      <p className="text-sm text-gray-700 mb-6">
        In compliance with Federal and State equal employment opportunity laws,
        qualified candidates are considered for all positions without regard to race, color,
        religion, sex, national origin, age, marital status, veteran status, non-job related
        disability, or any other protected group status.
      </p>

      <p className="text-sm font-bold text-gray-900 mb-3">
        To fill out this form, you will need to know the following:
      </p>

      <ul className="space-y-2 mb-6">
        <li className="flex items-start gap-3 text-sm text-gray-700">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          Social Security Number
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-700">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          Home address history for the past 3 years
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-700">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          Current driver license number and driver license history for the past 3 years
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-700">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          Employment history up to 10 years
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-700">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          History of traffic accidents, violations and/or convictions from the last 3 years (including DUI or reckless driving conviction and license suspension)
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-700">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          Military history (if applicable)
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-700">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          A photo of your driver&apos;s license (front and back)
        </li>
      </ul>

      <p className="text-sm text-gray-700 mb-2">
        Required entry fields are followed by <span className="text-red-500 font-bold">*</span>, meaning you must provide the requested
        information to continue. If you encounter any errors during this process and
        cannot continue, please contact us at <strong>hiring@alliedrefreshmentdistributing.com</strong>.
      </p>

      <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
