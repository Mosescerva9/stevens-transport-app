"use client";

import { useFormContext } from '@/lib/form-context';
import { useState } from 'react';

const buttonClass = (active: boolean) =>
  `px-6 py-1.5 text-sm border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`;

const selectClass = "w-full bg-gray-200 border-0 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none";
const inputClass = "w-full bg-gray-200 border-0 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none";

interface YesNoFieldProps {
  label: string;
  required?: boolean;
  value: boolean | null;
  onChange: (val: boolean) => void;
}

function YesNoField({ label, required, value, onChange }: YesNoFieldProps) {
  return (
    <div className="py-3 border-b border-gray-200">
      <p className="text-sm text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={() => onChange(true)} className={buttonClass(value === true)}>Yes</button>
        <button type="button" onClick={() => onChange(false)} className={buttonClass(value === false)}>No</button>
      </div>
    </div>
  );
}

export function GeneralInformationForm() {
  const { formData, updateFormData, setCurrentStep, prevStep } = useFormContext();

  const [eligibleForEmployment, setEligibleForEmployment] = useState<boolean | null>(
    formData.eligibleForEmployment !== undefined ? formData.eligibleForEmployment : null
  );
  const [speaksEnglish, setSpeaksEnglish] = useState<boolean | null>(
    formData.speaksEnglish !== undefined ? formData.speaksEnglish : null
  );
  const [militaryService, setMilitaryService] = useState<boolean | null>(
    formData.militaryService !== undefined ? formData.militaryService : null
  );
  const [workedForCompanyBefore, setWorkedForCompanyBefore] = useState<boolean | null>(
    formData.workedForCompanyBefore !== undefined ? formData.workedForCompanyBefore : null
  );
  const [knownByOtherName, setKnownByOtherName] = useState<boolean | null>(
    formData.knownByOtherName !== undefined ? formData.knownByOtherName : null
  );
  const [otherName, setOtherName] = useState(formData.otherName || '');
  const [attendingTruckSchool, setAttendingTruckSchool] = useState<boolean | null>(
    formData.attendingTruckSchool !== undefined ? formData.attendingTruckSchool : null
  );
  const [failedDrugTest, setFailedDrugTest] = useState<boolean | null>(
    formData.failedDrugTest !== undefined ? formData.failedDrugTest : null
  );
  const [mvrViolationsCount, setMvrViolationsCount] = useState(formData.mvrViolationsCount || '');
  const [hadAccidents3Years, setHadAccidents3Years] = useState<boolean | null>(
    formData.hadAccidents3Years !== undefined ? formData.hadAccidents3Years : null
  );
  const [mvrSuspensionsLength, setMvrSuspensionsLength] = useState(formData.mvrSuspensionsLength || '');

  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const errs: string[] = [];
    if (eligibleForEmployment === null) errs.push('Employment eligibility is required');
    if (speaksEnglish === null) errs.push('English proficiency is required');
    if (workedForCompanyBefore === null) errs.push('Previous company work history is required');
    if (knownByOtherName === null) errs.push('Other name question is required');
    if (attendingTruckSchool === null) errs.push('Truck school question is required');
    if (failedDrugTest === null) errs.push('Drug test question is required');
    if (!mvrViolationsCount) errs.push('MVR violations count is required');
    if (hadAccidents3Years === null) errs.push('Accidents question is required');
    if (!mvrSuspensionsLength) errs.push('MVR suspensions is required');
    setErrors(errs);
    return errs.length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    updateFormData({
      eligibleForEmployment: eligibleForEmployment!,
      speaksEnglish: speaksEnglish!,
      militaryService: militaryService || false,
      workedForCompanyBefore: workedForCompanyBefore!,
      knownByOtherName: knownByOtherName!,
      otherName: knownByOtherName ? otherName : '',
      attendingTruckSchool: attendingTruckSchool!,
      failedDrugTest: failedDrugTest!,
      mvrViolationsCount,
      hadAccidents3Years: hadAccidents3Years!,
      mvrSuspensionsLength,
    });
    setCurrentStep(3);
  };

  return (
    <div>
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 -mx-6 -mt-6 mb-6">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">General Information</h2>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          Please answer all required questions before continuing.
        </div>
      )}

      <div>
        <YesNoField
          label="Are you legally eligible for employment in the United States?"
          required
          value={eligibleForEmployment}
          onChange={setEligibleForEmployment}
        />

        <YesNoField
          label="Do you read, write, and speak English?"
          required
          value={speaksEnglish}
          onChange={setSpeaksEnglish}
        />

        <YesNoField
          label="Have you ever served in the military?"
          value={militaryService}
          onChange={setMilitaryService}
        />

        <YesNoField
          label="Have you ever worked for this company before?"
          required
          value={workedForCompanyBefore}
          onChange={setWorkedForCompanyBefore}
        />

        <YesNoField
          label="Have you ever been known by any other name?"
          required
          value={knownByOtherName}
          onChange={setKnownByOtherName}
        />

        {knownByOtherName && (
          <div className="py-3 border-b border-gray-200 pl-4">
            <label className="text-sm text-gray-700">Other Name(s)</label>
            <input
              value={otherName}
              onChange={e => setOtherName(e.target.value)}
              placeholder="Enter other name(s)"
              className={inputClass}
            />
          </div>
        )}

        <YesNoField
          label="Are you currently attending truck driving school?"
          required
          value={attendingTruckSchool}
          onChange={setAttendingTruckSchool}
        />

        <YesNoField
          label="Ever tested positive or refused a pre-employment drug or alcohol test?"
          required
          value={failedDrugTest}
          onChange={setFailedDrugTest}
        />

        {/* MVR Violations Dropdown */}
        <div className="py-3 border-b border-gray-200">
          <label className="text-sm text-gray-700">
            Number of Motor Vehicle Report violations in the last 4 years: <span className="text-red-500">*</span>
          </label>
          <select
            value={mvrViolationsCount}
            onChange={e => setMvrViolationsCount(e.target.value)}
            className={selectClass + " mt-2"}
          >
            <option value="">-- Select --</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5+">5 or more</option>
          </select>
        </div>

        <YesNoField
          label="Have you had any accidents in the last 3 years?"
          required
          value={hadAccidents3Years}
          onChange={setHadAccidents3Years}
        />

        {/* MVR Suspensions Dropdown */}
        <div className="py-3 border-b border-gray-200">
          <label className="text-sm text-gray-700">
            Length of MVR Suspensions in the last 3 years: <span className="text-red-500">*</span>
          </label>
          <select
            value={mvrSuspensionsLength}
            onChange={e => setMvrSuspensionsLength(e.target.value)}
            className={selectClass + " mt-2"}
          >
            <option value="">-- Select --</option>
            <option value="None">None</option>
            <option value="Less than 30 days">Less than 30 days</option>
            <option value="30-60 days">30-60 days</option>
            <option value="60-90 days">60-90 days</option>
            <option value="90+ days">90+ days</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
