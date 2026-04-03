"use client";

import { useForm as useReactHookForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';

const inputClass = "w-full bg-gray-200 border-0 p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none";

const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  duration: z.string(),
});

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  socialSecurity: z.string()
    .min(9, 'SSN must be 9 digits')
    .max(11, 'SSN must be 9 digits')
    .regex(/^\d{3}-?\d{2}-?\d{4}$/, 'Invalid SSN format'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\(\)]+$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
  // Address
  currentAddress: z.string().min(1, 'Street address is required'),
  currentCity: z.string().min(1, 'City is required'),
  currentState: z.string().min(2, 'State is required').max(2, 'Use 2-letter code'),
  currentZip: z.string().min(5, 'ZIP code is required').max(10),
  currentDuration: z.string().min(1, 'Duration is required'),
  livedHereThreeYears: z.boolean(),
  previousAddresses: z.array(addressSchema),
}).refine((data) => {
  if (data.livedHereThreeYears) return true;
  const complete = data.previousAddresses.filter(a =>
    a.address.trim() && a.city.trim() && a.state.trim() && a.zip.trim() && a.duration.trim()
  );
  return complete.length >= 1;
}, {
  message: "Please provide at least one previous address, or check the 3+ years box",
  path: ["previousAddresses"]
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function PersonalInfoForm() {
  const { formData, updateFormData, setCurrentStep } = useForm();
  const [showTestButton, setShowTestButton] = useState(false);
  const [certifyAccurate, setCertifyAccurate] = useState(false);
  const [smsConsent, setSmsConsent] = useState(formData.smsConsent || false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowTestButton(params.get('test') === 'true');
  }, []);

  const form = useReactHookForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      socialSecurity: formData.socialSecurity,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone,
      email: formData.email,
      currentAddress: formData.currentAddress,
      currentCity: formData.currentCity,
      currentState: formData.currentState,
      currentZip: formData.currentZip,
      currentDuration: formData.currentDuration,
      livedHereThreeYears: formData.livedHereThreeYears || false,
      previousAddresses: formData.previousAddresses.length > 0 ? formData.previousAddresses : [
        { address: '', city: '', state: '', zip: '', duration: '' }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'previousAddresses',
  });

  const livedHereThreeYears = form.watch('livedHereThreeYears');

  const onSubmit = (data: PersonalInfoFormData) => {
    const completeAddresses = data.livedHereThreeYears ? [] : data.previousAddresses.filter(a =>
      a.address.trim() && a.city.trim() && a.state.trim() && a.zip.trim() && a.duration.trim()
    );
    // Save all fields
    updateFormData('firstName', data.firstName);
    updateFormData('lastName', data.lastName);
    updateFormData('middleName', data.middleName);
    updateFormData('socialSecurity', data.socialSecurity);
    updateFormData('dateOfBirth', data.dateOfBirth);
    updateFormData('phone', data.phone);
    updateFormData('email', data.email);
    updateFormData('currentAddress', data.currentAddress);
    updateFormData('currentCity', data.currentCity);
    updateFormData('currentState', data.currentState);
    updateFormData('currentZip', data.currentZip);
    updateFormData('currentDuration', data.currentDuration);
    updateFormData('livedHereThreeYears', data.livedHereThreeYears);
    updateFormData('previousAddresses', completeAddresses);
    updateFormData('smsConsent', smsConsent);
    setCurrentStep(2);
  };

  const fillTestData = () => {
    const today = new Date().toISOString().split('T')[0];
    setCertifyAccurate(true);
    setSmsConsent(true);
    updateFormData('licenseImageFront', 'https://placehold.co/400x250/e2e8f0/333333?text=TEST+LICENSE+FRONT');
    updateFormData('licenseImageBack', 'https://placehold.co/400x250/e2e8f0/333333?text=TEST+LICENSE+BACK');
    form.setValue('firstName', 'John', { shouldValidate: true });
    form.setValue('middleName', 'A', { shouldValidate: true });
    form.setValue('lastName', 'Smith', { shouldValidate: true });
    form.setValue('socialSecurity', '999-88-7777', { shouldValidate: true });
    form.setValue('dateOfBirth', '1995-06-15', { shouldValidate: true });
    form.setValue('phone', '(555) 123-4567', { shouldValidate: true });
    form.setValue('email', 'testdriver@gmail.com', { shouldValidate: true });
    form.setValue('currentAddress', '123 Main St', { shouldValidate: true });
    form.setValue('currentCity', 'Kansas City', { shouldValidate: true });
    form.setValue('currentState', 'KS', { shouldValidate: true });
    form.setValue('currentZip', '66101', { shouldValidate: true });
    form.setValue('currentDuration', '4 years', { shouldValidate: true });
    form.setValue('livedHereThreeYears', true, { shouldValidate: true });
    updateFormData('currentEmployer', 'ABC Trucking');
    updateFormData('currentPosition', 'Driver');
    updateFormData('currentStartDate', '2020-01-01');
    updateFormData('currentEndDate', '');
    updateFormData('currentSalary', '$50000');
    updateFormData('currentReasonForLeaving', '');
    updateFormData('previousEmployment', []);
    updateFormData('militaryService', false);
    updateFormData('licenseNumber', 'K12345678');
    updateFormData('licenseState', 'KS');
    updateFormData('licenseExpiration', '2028-01-01');
    updateFormData('cdlClass', '');
    updateFormData('endorsements', []);
    updateFormData('restrictions', []);
    updateFormData('accidents', []);
    updateFormData('violations', []);
    updateFormData('hasConvictions', false);
    updateFormData('convictionsDetails', '');
    updateFormData('canLiftFiftyLbs', true);
    updateFormData('hasPhysicalLimits', false);
    updateFormData('availableWeekends', true);
    updateFormData('availableOvernight', false);
    updateFormData('expectedPay', '$20/hr');
    updateFormData('howHeardAboutUs', 'craigslist');
    updateFormData('emergencyContactName', 'Jane Smith');
    updateFormData('emergencyContactPhone', '555-987-6543');
    updateFormData('emergencyContactRelation', 'Spouse');
    updateFormData('signature', 'John A Smith');
    updateFormData('signatureDate', today);
  };

  const isValid = form.formState.isValid;

  const formatSSN = (value: string) => {
    const n = value.replace(/\D/g, '');
    if (n.length <= 3) return n;
    if (n.length <= 5) return `${n.slice(0, 3)}-${n.slice(3)}`;
    return `${n.slice(0, 3)}-${n.slice(3, 5)}-${n.slice(5, 9)}`;
  };

  const formatPhone = (value: string) => {
    const n = value.replace(/\D/g, '');
    if (n.length <= 3) return n;
    if (n.length <= 6) return `(${n.slice(0, 3)}) ${n.slice(3)}`;
    return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6, 10)}`;
  };

  return (
    <FormLayout
      title="Personal Information"
      canGoNext={isValid && certifyAccurate}
      canGoPrevious={true}
      onNext={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        {showTestButton && (
          <button type="button" onClick={fillTestData}
            className="px-3 py-1 text-xs font-medium border border-orange-300 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded mb-2"
          >
            Fill Test Data
          </button>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            {/* ── Personal Information ── */}
            <h3 className="text-base font-bold text-gray-900 mb-1 pb-1 border-b border-gray-300">Personal Information</h3>
            <div className="space-y-3 mb-8 mt-3">
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">First Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="middleName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Middle Name</FormLabel>
                  <FormControl><input {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Last Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="socialSecurity" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">SSN / SIN <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <input {...field} maxLength={11} className={inputClass}
                      onChange={(e) => field.onChange(formatSSN(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Date of Birth <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input type="date" {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* ── Address ── */}
            <h3 className="text-base font-bold text-gray-900 mb-1 pb-1 border-b border-gray-300">Address</h3>
            <div className="space-y-3 mb-8 mt-3">
              <FormField control={form.control} name="currentAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Current Street Address <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentCity" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">City <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentState" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">State/Province <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <input {...field} maxLength={2} style={{ textTransform: 'uppercase' }}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())} className={inputClass} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentZip" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Zip/Postal Code <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentDuration" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">How long at this address? <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input {...field} placeholder="e.g. 2 years 6 months" className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="livedHereThreeYears" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Residence address for 3 or more years? <span className="text-red-500">*</span></FormLabel>
                  <div className="flex gap-4 mt-1">
                    <button type="button"
                      onClick={() => field.onChange(true)}
                      className={`px-6 py-1.5 text-sm border ${field.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
                    >Yes</button>
                    <button type="button"
                      onClick={() => field.onChange(false)}
                      className={`px-6 py-1.5 text-sm border ${field.value === false ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
                    >No</button>
                  </div>
                </FormItem>
              )} />

              {/* Previous Addresses */}
              {!livedHereThreeYears && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-gray-800">Previous Addresses (Past 3 Years)</p>
                    <button type="button"
                      onClick={() => append({ address: '', city: '', state: '', zip: '', duration: '' })}
                      className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    >+ Add Address</button>
                  </div>

                  {form.formState.errors.previousAddresses?.message && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 text-red-700 text-sm">
                      {form.formState.errors.previousAddresses.message}
                    </div>
                  )}

                  {fields.map((f, index) => (
                    <div key={f.id} className="border border-gray-300 p-4 mb-3 relative">
                      {fields.length > 1 && (
                        <button type="button" onClick={() => remove(index)}
                          className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700">Remove</button>
                      )}
                      <p className="text-xs font-bold text-gray-600 uppercase mb-2">Previous Address #{index + 1}</p>
                      <div className="space-y-2">
                        <FormField control={form.control} name={`previousAddresses.${index}.address`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700">Street Address</FormLabel>
                            <FormControl><input {...field} className={inputClass} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name={`previousAddresses.${index}.city`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700">City</FormLabel>
                            <FormControl><input {...field} className={inputClass} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name={`previousAddresses.${index}.state`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700">State</FormLabel>
                            <FormControl><input {...field} maxLength={2} style={{ textTransform: 'uppercase' }}
                              onChange={(e) => field.onChange(e.target.value.toUpperCase())} className={inputClass} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name={`previousAddresses.${index}.zip`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700">ZIP Code</FormLabel>
                            <FormControl><input {...field} className={inputClass} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name={`previousAddresses.${index}.duration`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700">Duration</FormLabel>
                            <FormControl><input {...field} placeholder="e.g. 6 months" className={inputClass} /></FormControl>
                          </FormItem>
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Contact ── */}
            <h3 className="text-base font-bold text-gray-900 mb-1 pb-1 border-b border-gray-300">Contact</h3>
            <p className="text-sm italic text-gray-500 mt-2 mb-3">If your cell phone is also your primary phone, enter it in both fields below.</p>
            <div className="space-y-3 mb-6">
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Primary Phone <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <input {...field} maxLength={14} className={inputClass}
                      onChange={(e) => field.onChange(formatPhone(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Email Address <span className="text-red-500">*</span></FormLabel>
                  <FormControl><input type="email" {...field} className={inputClass} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Certification */}
            <label className="flex items-start gap-3 border border-gray-300 p-3 bg-gray-50 cursor-pointer">
              <input type="checkbox" checked={certifyAccurate}
                onChange={e => setCertifyAccurate(e.target.checked)} className="w-4 h-4 mt-0.5" />
              <span className="text-sm text-gray-700">
                I certify that all information I provide in this application is true, complete, and accurate to the best of my knowledge.
                I understand that any false statements may result in disqualification or termination.
              </span>
            </label>

            {/* SMS Consent */}
            <label className="flex items-start gap-3 border border-gray-300 p-3 bg-gray-50 cursor-pointer mt-3">
              <input type="checkbox" checked={smsConsent}
                onChange={e => setSmsConsent(e.target.checked)} className="w-4 h-4 mt-0.5" />
              <span className="text-sm text-gray-700">
                I agree to receive text messages from Allied Refreshment Distributing regarding my application and employment opportunities.
                Message and data rates may apply. You can opt out at any time by replying STOP.
              </span>
            </label>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
