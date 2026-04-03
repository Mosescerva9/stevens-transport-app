"use client";

import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  socialSecurity: z.string()
    .min(9, 'Social Security Number must be 9 digits')
    .max(11, 'Social Security Number must be 9 digits')
    .regex(/^\d{3}-?\d{2}-?\d{4}$/, 'Invalid Social Security Number format'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\(\)]+$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function PersonalInfoForm() {
  const { formData, updateFormData, setCurrentStep } = useForm();
  const [showTestButton, setShowTestButton] = useState(false);
  const [certifyAccurate, setCertifyAccurate] = useState(false);

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
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    Object.keys(data).forEach(key => {
      updateFormData(key, data[key as keyof PersonalInfoFormData]);
    });
    setCurrentStep(1);
  };

  const fillTestData = () => {
    const today = new Date().toISOString().split('T')[0];

    // Auto-check the certification checkbox for test mode
    setCertifyAccurate(true);

    // Use placeholder images for license (Cloudinary may not be configured)
    updateFormData('licenseImageFront', 'https://placehold.co/400x250/e2e8f0/333333?text=TEST+LICENSE+FRONT');
    updateFormData('licenseImageBack', 'https://placehold.co/400x250/e2e8f0/333333?text=TEST+LICENSE+BACK');

    // Fill personal info form fields
    form.setValue('firstName', 'John', { shouldValidate: true });
    form.setValue('middleName', 'A', { shouldValidate: true });
    form.setValue('lastName', 'Smith', { shouldValidate: true });
    form.setValue('socialSecurity', '999-88-7777', { shouldValidate: true });
    form.setValue('dateOfBirth', '1995-06-15', { shouldValidate: true });
    form.setValue('phone', '(555) 123-4567', { shouldValidate: true });
    form.setValue('email', 'testdriver@gmail.com', { shouldValidate: true });

    // Fill ALL other steps via updateFormData so they're pre-populated
    // Address History (Step 1)
    updateFormData('currentAddress', '123 Main St');
    updateFormData('currentCity', 'Kansas City');
    updateFormData('currentState', 'KS');
    updateFormData('currentZip', '66101');
    updateFormData('currentDuration', '4 years');
    updateFormData('livedHereThreeYears', true);
    updateFormData('previousAddresses', []);

    // Employment (Step 2)
    updateFormData('currentEmployer', 'ABC Trucking');
    updateFormData('currentPosition', 'Driver');
    updateFormData('currentStartDate', '2020-01-01');
    updateFormData('currentEndDate', '');
    updateFormData('currentSalary', '$50000');
    updateFormData('currentReasonForLeaving', '');
    updateFormData('previousEmployment', []);
    updateFormData('militaryService', false);

    // Driving History (Step 3)
    updateFormData('licenseNumber', 'K12345678');
    updateFormData('licenseState', 'KS');
    updateFormData('licenseExpiration', '2028-01-01');
    updateFormData('cdlClass', '');
    updateFormData('endorsements', []);
    updateFormData('restrictions', []);
    updateFormData('accidents', []);
    updateFormData('violations', []);

    // Additional Questions (Step 4)
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

    // Signature (Step 4)
    updateFormData('signature', 'John A Smith');
    updateFormData('signatureDate', today);
  };

  const isValid = form.formState.isValid;

  const formatSSN = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 5) return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 5)}-${numericValue.slice(5, 9)}`;
  };

  const formatPhone = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6) return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
    return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
  };

  return (
    <FormLayout
      title="Personal Information"
      canGoNext={isValid && certifyAccurate}
      canGoPrevious={true}
      onNext={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        {showTestButton && (
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1 text-xs font-medium border border-orange-300 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded"
          >
            Fill Test Data
          </button>
        )}

        <p className="text-sm text-gray-600 mb-4">
          Please provide your personal information exactly as it appears on your driver&apos;s license
          and Social Security card. This information will be used to verify your identity and
          conduct background checks as required by federal regulations.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="border-gray-300 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Michael" {...field} className="border-gray-300 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Smith" {...field} className="border-gray-300 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="socialSecurity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                      Social Security Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123-45-6789"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatSSN(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={11}
                        className="border-gray-300 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                      Date of Birth <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="border-gray-300 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(555) 123-4567"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={14}
                        className="border-gray-300 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.smith@email.com" {...field} className="border-gray-300 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 text-sm text-blue-800">
              <strong>Note:</strong> All information must be accurate and complete.
              False or misleading information may result in disqualification from employment.
            </div>

            <label className="flex items-start gap-3 border border-gray-300 p-3 bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={certifyAccurate}
                onChange={e => setCertifyAccurate(e.target.checked)}
                className="w-4 h-4 mt-0.5"
              />
              <span className="text-sm text-gray-700">
                I certify that all information I provide in this application is true, complete, and accurate to the best of my knowledge.
                I understand that any false statements may result in disqualification or termination.
              </span>
            </label>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
