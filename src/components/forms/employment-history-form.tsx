"use client";

import { useForm as useReactHookForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const employmentSchema = z.object({
  employer: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  salary: z.string(),
  reasonForLeaving: z.string(),
});

const employmentHistorySchema = z.object({
  currentEmployer: z.string().min(1, 'Current employer is required'),
  currentPosition: z.string().min(1, 'Current position is required'),
  currentStartDate: z.string().min(1, 'Start date is required'),
  currentEndDate: z.string().optional(),
  currentSalary: z.string().min(1, 'Salary is required'),
  currentReasonForLeaving: z.string().optional(),
  previousEmployment: z.array(employmentSchema),
  militaryService: z.boolean(),
  militaryBranch: z.string().optional(),
  militaryRank: z.string().optional(),
  militaryDates: z.string().optional(),
});

type EmploymentHistoryFormData = z.infer<typeof employmentHistorySchema>;

export function EmploymentHistoryForm() {
  const { formData, updateFormData, setCurrentStep } = useForm();

  const form = useReactHookForm<EmploymentHistoryFormData>({
    resolver: zodResolver(employmentHistorySchema),
    mode: 'onChange',
    defaultValues: {
      currentEmployer: formData.currentEmployer || '',
      currentPosition: formData.currentPosition || '',
      currentStartDate: formData.currentStartDate || '',
      currentEndDate: formData.currentEndDate || '',
      currentSalary: formData.currentSalary || '',
      currentReasonForLeaving: formData.currentReasonForLeaving || '',
      previousEmployment: formData.previousEmployment || [],
      militaryService: formData.militaryService || false,
      militaryBranch: formData.militaryBranch || '',
      militaryRank: formData.militaryRank || '',
      militaryDates: formData.militaryDates || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'previousEmployment',
  });

  const militaryService = form.watch('militaryService');

  const onSubmit = async (data: EmploymentHistoryFormData) => {
    const completeEmployment = (data.previousEmployment || []).filter(emp =>
      emp.employer && emp.employer.trim() && emp.position && emp.position.trim()
    );

    updateFormData('currentEmployer', data.currentEmployer);
    updateFormData('currentPosition', data.currentPosition);
    updateFormData('currentStartDate', data.currentStartDate);
    updateFormData('currentEndDate', data.currentEndDate);
    updateFormData('currentSalary', data.currentSalary);
    updateFormData('currentReasonForLeaving', data.currentReasonForLeaving);
    updateFormData('previousEmployment', completeEmployment);
    updateFormData('militaryService', data.militaryService);
    updateFormData('militaryBranch', data.militaryBranch);
    updateFormData('militaryRank', data.militaryRank);
    updateFormData('militaryDates', data.militaryDates);
    setCurrentStep(3);
  };

  return (
    <FormLayout
      title="Employment History"
      canGoNext={true}
      canGoPrevious={true}
      onNext={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600 mb-4">
          Please provide your current employment information. Previous employment is optional
          but helps us verify your work history.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Employment */}
            <div className="border border-gray-300 p-4">
              <div className="bg-gray-100 -mx-4 -mt-4 mb-4 px-4 py-2 border-b border-gray-300">
                <h3 className="text-xs font-bold text-gray-700 uppercase">Current Employment</h3>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentEmployer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                        Employer Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ABC Trucking Company" {...field} className="border-gray-300 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                        Position/Job Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Truck Driver" {...field} className="border-gray-300 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="currentStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          Start Date <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="border-gray-300 text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentSalary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          Salary/Wage <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="$50,000/year or $25/hour" {...field} className="border-gray-300 text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Previous Employment */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800">
                  Previous Employment <span className="text-xs font-normal text-gray-500">(Optional)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => append({ employer: '', position: '', startDate: '', endDate: '', salary: '', reasonForLeaving: '' })}
                  className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                >
                  + Add Job
                </button>
              </div>

              {fields.length === 0 && (
                <p className="text-gray-500 text-xs mb-4">No previous employment added.</p>
              )}

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="border border-gray-300 p-4 relative">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                    <h4 className="text-xs font-bold text-gray-600 uppercase mb-3">Previous Job #{index + 1}</h4>
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name={`previousEmployment.${index}.employer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Employer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="XYZ Logistics" {...field} className="border-gray-300 text-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`previousEmployment.${index}.position`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Delivery Driver" {...field} className="border-gray-300 text-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name={`previousEmployment.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="border-gray-300 text-sm" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`previousEmployment.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold text-gray-700 uppercase">End Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="border-gray-300 text-sm" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`previousEmployment.${index}.reasonForLeaving`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Reason for Leaving</FormLabel>
                            <FormControl>
                              <Input placeholder="Better pay, career advancement, etc." {...field} className="border-gray-300 text-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Military Service */}
            <div className="border border-gray-300 p-4">
              <div className="bg-gray-100 -mx-4 -mt-4 mb-4 px-4 py-2 border-b border-gray-300">
                <h3 className="text-xs font-bold text-gray-700 uppercase">Military Service</h3>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="militaryService"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="text-sm font-medium">I have served in the military</FormLabel>
                    </FormItem>
                  )}
                />

                {militaryService && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                    <FormField
                      control={form.control}
                      name="militaryBranch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Branch</FormLabel>
                          <FormControl>
                            <Input placeholder="Army, Navy, etc." {...field} className="border-gray-300 text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="militaryRank"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Final Rank</FormLabel>
                          <FormControl>
                            <Input placeholder="Sergeant, etc." {...field} className="border-gray-300 text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="militaryDates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Dates of Service</FormLabel>
                          <FormControl>
                            <Input placeholder="2010-2014" {...field} className="border-gray-300 text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
