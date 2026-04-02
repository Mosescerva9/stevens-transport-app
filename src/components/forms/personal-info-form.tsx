"use client";

import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
      canGoNext={isValid}
      canGoPrevious={true}
      onNext={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
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
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
