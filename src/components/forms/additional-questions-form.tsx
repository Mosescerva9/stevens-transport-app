"use client";

import { useFormContext } from '@/lib/form-context';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function AdditionalQuestionsForm() {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.signature) newErrors.signature = 'Signature (typed full name) is required';
    if (!formData.signatureDate) newErrors.signatureDate = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Additional Questions</h2>
      <p className="text-gray-500 text-sm mb-6">Please answer all questions honestly. A criminal record does not automatically disqualify you.</p>

      <div className="space-y-6">

        {/* Convictions */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you ever been convicted of a felony or misdemeanor (excluding minor traffic violations)?
          </label>
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="hasConvictions" value="true"
                checked={formData.hasConvictions === true}
                onChange={() => updateFormData({ hasConvictions: true })}
              /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="hasConvictions" value="false"
                checked={formData.hasConvictions === false}
                onChange={() => updateFormData({ hasConvictions: false })}
              /> No
            </label>
          </div>
          {formData.hasConvictions && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Please provide details (date, offense, outcome):</label>
              <textarea className="w-full border rounded-lg p-2 text-sm" rows={3}
                value={formData.convictionsDetails || ''}
                onChange={e => updateFormData({ convictionsDetails: e.target.value })}
                placeholder="Describe the conviction(s)..."
              />
            </div>
          )}
        </div>

        {/* Physical Requirements */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-700 mb-3">Physical Requirements</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={formData.canLiftFiftyLbs || false}
                onChange={e => updateFormData({ canLiftFiftyLbs: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">I can lift and carry 50+ lbs repeatedly throughout a workday</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={formData.hasPhysicalLimits || false}
                onChange={e => updateFormData({ hasPhysicalLimits: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">I have physical limitations that may affect my ability to perform this job</span>
            </label>
            {formData.hasPhysicalLimits && (
              <textarea className="w-full border rounded-lg p-2 text-sm mt-1" rows={2}
                value={formData.physicalLimitsDetails || ''}
                onChange={e => updateFormData({ physicalLimitsDetails: e.target.value })}
                placeholder="Describe your limitations..."
              />
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-700 mb-3">Availability</p>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={formData.availableWeekends || false}
                onChange={e => updateFormData({ availableWeekends: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Available to work Saturdays when needed</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={formData.availableOvernight || false}
                onChange={e => updateFormData({ availableOvernight: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Available for occasional overnight routes</span>
            </label>
          </div>
        </div>

        {/* Pay & Referral */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Pay (per hour or weekly)</label>
            <input type="text" className="w-full border rounded-lg p-2 text-sm"
              value={formData.expectedPay || ''}
              onChange={e => updateFormData({ expectedPay: e.target.value })}
              placeholder="e.g. $18/hr or $900/week"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How did you hear about this position?</label>
            <select className="w-full border rounded-lg p-2 text-sm"
              value={formData.howHeardAboutUs || ''}
              onChange={e => updateFormData({ howHeardAboutUs: e.target.value })}>
              <option value="">Select...</option>
              <option value="craigslist">Craigslist</option>
              <option value="indeed">Indeed</option>
              <option value="referral">Employee Referral</option>
              <option value="facebook">Facebook</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {formData.howHeardAboutUs === 'referral' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who referred you?</label>
            <input type="text" className="w-full border rounded-lg p-2 text-sm"
              value={formData.referredBy || ''}
              onChange={e => updateFormData({ referredBy: e.target.value })}
              placeholder="Employee name"
            />
          </div>
        )}

        {/* Emergency Contact */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-700 mb-3">Emergency Contact</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Full Name</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm"
                value={formData.emergencyContactName || ''}
                onChange={e => updateFormData({ emergencyContactName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Phone Number</label>
              <input type="tel" className="w-full border rounded-lg p-2 text-sm"
                value={formData.emergencyContactPhone || ''}
                onChange={e => updateFormData({ emergencyContactPhone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Relationship</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm"
                value={formData.emergencyContactRelation || ''}
                onChange={e => updateFormData({ emergencyContactRelation: e.target.value })}
                placeholder="Spouse, Parent, etc."
              />
            </div>
          </div>
        </div>

        {/* Certification & Signature */}
        <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
          <p className="text-sm font-medium text-gray-900 mb-2">Certification & Electronic Signature</p>
          <p className="text-xs text-gray-600 mb-3">
            I certify that all information provided in this application is true and complete to the best of my knowledge.
            I understand that false information or omissions may disqualify me from consideration or result in termination.
            I authorize Allied Refreshment Distributing to contact my previous employers, verify my references, and conduct
            a background check and MVR report. I understand this application does not constitute a contract of employment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Type your full legal name as signature *</label>
              <input type="text" className={`w-full border rounded-lg p-2 text-sm font-medium ${errors.signature ? 'border-red-400' : ''}`}
                value={formData.signature || ''}
                onChange={e => updateFormData({ signature: e.target.value })}
                placeholder="Your full legal name"
              />
              {errors.signature && <p className="text-red-500 text-xs mt-1">{errors.signature}</p>}
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Date *</label>
              <input type="date" className={`w-full border rounded-lg p-2 text-sm ${errors.signatureDate ? 'border-red-400' : ''}`}
                value={formData.signatureDate || ''}
                onChange={e => updateFormData({ signatureDate: e.target.value })}
              />
              {errors.signatureDate && <p className="text-red-500 text-xs mt-1">{errors.signatureDate}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep}>← Back</Button>
        <Button onClick={handleNext} className="bg-blue-700 hover:bg-blue-800 text-white">Review Application →</Button>
      </div>
    </div>
  );
}
