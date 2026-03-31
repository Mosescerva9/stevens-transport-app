"use client";

import { useForm as useReactHookForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase, Star } from 'lucide-react';
import { useState } from 'react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    // Filter out incomplete employment records
    const completeEmployment = (data.previousEmployment || []).filter(emp =>
      emp.employer && emp.employer.trim() && emp.position && emp.position.trim()
    );

    // Save to form context and move to next step
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

    // Move to next step (Driving History)
    setCurrentStep(3);
  };

  const isValid = form.formState.isValid;

  return (
    <FormLayout
      title="Employment History"
      canGoNext={true}
      canGoPrevious={true}
      onNext={form.handleSubmit(onSubmit)}
      nextLabel="Next →"
      
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-700 leading-relaxed mb-6">
            Please provide your current employment information. Previous employment is optional
            but helps us verify your work history.
          </p>
        </motion.div>

        {/* Submit Error */}
        {submitError && (
          <motion.div
            className="p-4 bg-red-50 rounded-lg border border-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-800 text-sm">
              <strong>Error:</strong> {submitError}
            </p>
          </motion.div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Current Employment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 border-green-200 bg-green-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-600" />
                  Current Employment
                </h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentEmployer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Employer Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ABC Trucking Company"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
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
                        <FormLabel className="text-gray-700 font-medium">
                          Position/Job Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Truck Driver"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
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
                          <FormLabel className="text-gray-700 font-medium">
                            Start Date <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            />
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
                          <FormLabel className="text-gray-700 font-medium">
                            Salary/Wage <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="$50,000/year or $25/hour"
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Previous Employment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Previous Employment
                  <span className="text-sm font-normal text-gray-500">(Optional)</span>
                </h3>
                <Button
                  type="button"
                  onClick={() => append({ employer: '', position: '', startDate: '', endDate: '', salary: '', reasonForLeaving: '' })}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Job
                </Button>
              </div>

              {fields.length === 0 && (
                <p className="text-gray-500 text-sm mb-4">
                  No previous employment added. Tap "Add Job" if you&apos;d like to include past positions.
                </p>
              )}

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6 relative">
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <h4 className="font-medium text-gray-700 mb-4">
                        Previous Job #{index + 1}
                      </h4>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`previousEmployment.${index}.employer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Employer Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="XYZ Logistics"
                                  {...field}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
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
                              <FormLabel className="text-gray-700 font-medium">Position/Job Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Delivery Driver"
                                  {...field}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`previousEmployment.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Start Date</FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    {...field}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
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
                                <FormLabel className="text-gray-700 font-medium">End Date</FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    {...field}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
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
                              <FormLabel className="text-gray-700 font-medium">Reason for Leaving</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Better pay, career advancement, layoff, etc."
                                  {...field}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Military Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 border-purple-200 bg-purple-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Military Service</h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="militaryService"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-base font-medium">
                            I have served in the military
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {militaryService && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-purple-200"
                    >
                      <FormField
                        control={form.control}
                        name="militaryBranch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Branch of Service</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Army, Navy, Air Force, etc."
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
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
                            <FormLabel className="text-gray-700 font-medium">Final Rank</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Sergeant, Corporal, etc."
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
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
                            <FormLabel className="text-gray-700 font-medium">Dates of Service</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="2010-2014"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Final Note */}
            <motion.div
              className="p-4 bg-green-50 rounded-lg border border-green-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-green-800 text-sm">
                <strong>Note:</strong> Please review all information carefully before submitting.
                Previous employment is optional. Fill in what applies to you.
              </p>
            </motion.div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
