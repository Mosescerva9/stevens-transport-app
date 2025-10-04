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
import { Plus, Trash2, AlertTriangle } from 'lucide-react';

const accidentSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  fatalities: z.boolean(),
  injuries: z.boolean(),
});

const violationSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  violation: z.string().min(1, 'Violation type is required'),
  location: z.string().min(1, 'Location is required'),
});

const drivingHistorySchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  licenseState: z.string().min(2, 'State is required').max(2, 'Use 2-letter state code'),
  licenseExpiration: z.string().min(1, 'Expiration date is required'),
  cdlClass: z.string(),
  endorsements: z.array(z.string()),
  restrictions: z.array(z.string()),
  accidents: z.array(accidentSchema),
  violations: z.array(violationSchema),
});

type DrivingHistoryFormData = z.infer<typeof drivingHistorySchema>;

const endorsementOptions = [
  { id: 'H', label: 'H - Hazardous Materials' },
  { id: 'N', label: 'N - Tank Vehicles' },
  { id: 'P', label: 'P - Passenger' },
  { id: 'S', label: 'S - School Bus' },
  { id: 'T', label: 'T - Double/Triple Trailers' },
  { id: 'X', label: 'X - Combination of H and N' },
];

const restrictionOptions = [
  { id: 'B', label: 'B - Corrective Lenses' },
  { id: 'C', label: 'C - Mechanical Aid' },
  { id: 'D', label: 'D - Prosthetic Aid' },
  { id: 'E', label: 'E - Automatic Transmission' },
  { id: 'F', label: 'F - Outside Mirror' },
  { id: 'G', label: 'G - Limit to Daylight Only' },
];

export function DrivingHistoryForm() {
  const { formData, updateFormData, setCurrentStep } = useForm();

  const form = useReactHookForm<DrivingHistoryFormData>({
    resolver: zodResolver(drivingHistorySchema),
    defaultValues: {
      licenseNumber: formData.licenseNumber,
      licenseState: formData.licenseState,
      licenseExpiration: formData.licenseExpiration,
      cdlClass: formData.cdlClass,
      endorsements: formData.endorsements,
      restrictions: formData.restrictions,
      accidents: formData.accidents.length > 0 ? formData.accidents : [],
      violations: formData.violations.length > 0 ? formData.violations : [],
    },
  });

  const { fields: accidentFields, append: appendAccident, remove: removeAccident } = useFieldArray({
    control: form.control,
    name: 'accidents',
  });

  const { fields: violationFields, append: appendViolation, remove: removeViolation } = useFieldArray({
    control: form.control,
    name: 'violations',
  });

  const onSubmit = (data: DrivingHistoryFormData) => {
    // Update form context with driving history
    Object.keys(data).forEach(key => {
      updateFormData(key, data[key as keyof DrivingHistoryFormData]);
    });

    // Move to next step
    setCurrentStep(4);
  };

  const isValid = form.formState.isValid;

  return (
    <FormLayout
      title="Driver License & Driving History"
      canGoNext={isValid}
      canGoPrevious={true}
      onNext={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-700 leading-relaxed mb-6">
            Please provide your complete driver license information and driving history for the past 3 years.
            This information is required by federal regulations and will be verified through official records.
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Driver License Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 border-blue-200 bg-blue-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Driver License Information</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            License Number <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12345678"
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
                      name="licenseState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            State Issued <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="TX"
                              {...field}
                              maxLength={2}
                              style={{ textTransform: 'uppercase' }}
                              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="licenseExpiration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Expiration Date <span className="text-red-500">*</span>
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
                  </div>

                  <FormField
                    control={form.control}
                    name="cdlClass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">CDL Class (if applicable)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A, B, or C"
                            {...field}
                            maxLength={1}
                            style={{ textTransform: 'uppercase' }}
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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

            {/* Endorsements & Restrictions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Endorsements */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Endorsements</h3>
                <FormField
                  control={form.control}
                  name="endorsements"
                  render={() => (
                    <FormItem>
                      <div className="space-y-2">
                        {endorsementOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="endorsements"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              {/* Restrictions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Restrictions</h3>
                <FormField
                  control={form.control}
                  name="restrictions"
                  render={() => (
                    <FormItem>
                      <div className="space-y-2">
                        {restrictionOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="restrictions"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            </motion.div>

            {/* Accidents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Traffic Accidents (Past 3 Years)
                </h3>
                <Button
                  type="button"
                  onClick={() => appendAccident({ date: '', description: '', fatalities: false, injuries: false })}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-red-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Accident
                </Button>
              </div>

              {accidentFields.length === 0 && (
                <Card className="p-6 text-center text-gray-500">
                  <p>No accidents reported. Click "Add Accident" if you have any to report.</p>
                </Card>
              )}

              <div className="space-y-4">
                {accidentFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6 relative border-red-200">
                      <Button
                        type="button"
                        onClick={() => removeAccident(index)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <h4 className="font-medium text-gray-700 mb-4">Accident #{index + 1}</h4>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`accidents.${index}.date`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Date</FormLabel>
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
                            name={`accidents.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Description</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Brief description of accident"
                                    {...field}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-6">
                          <FormField
                            control={form.control}
                            name={`accidents.${index}.fatalities`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Fatalities involved
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`accidents.${index}.injuries`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Injuries involved
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Violations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Traffic Violations (Past 3 Years)
                </h3>
                <Button
                  type="button"
                  onClick={() => appendViolation({ date: '', violation: '', location: '' })}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-orange-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Violation
                </Button>
              </div>

              {violationFields.length === 0 && (
                <Card className="p-6 text-center text-gray-500">
                  <p>No violations reported. Click "Add Violation" if you have any to report.</p>
                </Card>
              )}

              <div className="space-y-4">
                {violationFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6 relative border-orange-200">
                      <Button
                        type="button"
                        onClick={() => removeViolation(index)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <h4 className="font-medium text-gray-700 mb-4">Violation #{index + 1}</h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`violations.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Date</FormLabel>
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
                          name={`violations.${index}.violation`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Violation Type</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Speeding, DUI, etc."
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
                          name={`violations.${index}.location`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Location</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="City, State"
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

            {/* Note */}
            <motion.div
              className="p-4 bg-red-50 rounded-lg border border-red-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> You must report ALL accidents and violations, even if charges were dismissed.
                Failure to disclose this information may result in disqualification from employment.
              </p>
            </motion.div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
