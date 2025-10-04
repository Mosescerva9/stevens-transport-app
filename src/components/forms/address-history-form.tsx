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
import { Plus, Trash2 } from 'lucide-react';

const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  duration: z.string(),
});

const addressHistorySchema = z.object({
  currentAddress: z.string().min(1, 'Current address is required'),
  currentCity: z.string().min(1, 'Current city is required'),
  currentState: z.string().min(2, 'State is required').max(2, 'Use 2-letter state code'),
  currentZip: z.string().min(5, 'ZIP code must be at least 5 digits').max(10, 'Invalid ZIP code'),
  currentDuration: z.string().min(1, 'Duration is required'),
  livedHereThreeYears: z.boolean(),
  previousAddresses: z.array(addressSchema),
}).refine((data) => {
  // If they've lived at current address for 3+ years, previous addresses are not required
  if (data.livedHereThreeYears) {
    return true;
  }

  // Otherwise, at least one previous address should be complete (all fields filled)
  const completeAddresses = data.previousAddresses.filter(addr =>
    addr.address.trim() && addr.city.trim() && addr.state.trim() && addr.zip.trim() && addr.duration.trim()
  );
  return completeAddresses.length >= 1;
}, {
  message: "Please provide at least one complete previous address, or indicate if you've lived at your current address for 3+ years",
  path: ["previousAddresses"]
});

type AddressHistoryFormData = z.infer<typeof addressHistorySchema>;

export function AddressHistoryForm() {
  const { formData, updateFormData, setCurrentStep } = useForm();

  const form = useReactHookForm<AddressHistoryFormData>({
    resolver: zodResolver(addressHistorySchema),
    defaultValues: {
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

  const onSubmit = (data: AddressHistoryFormData) => {
    // Filter out incomplete addresses before saving (only if previous addresses are required)
    const completeAddresses = data.livedHereThreeYears ? [] : data.previousAddresses.filter(addr =>
      addr.address.trim() && addr.city.trim() && addr.state.trim() && addr.zip.trim() && addr.duration.trim()
    );

    // Update form context with address history
    updateFormData('currentAddress', data.currentAddress);
    updateFormData('currentCity', data.currentCity);
    updateFormData('currentState', data.currentState);
    updateFormData('currentZip', data.currentZip);
    updateFormData('currentDuration', data.currentDuration);
    updateFormData('livedHereThreeYears', data.livedHereThreeYears);
    updateFormData('previousAddresses', completeAddresses);

    // Move to next step
    setCurrentStep(3);
  };

  const isValid = form.formState.isValid;

  return (
    <FormLayout
      title="Address History"
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
            Please provide your complete address history for the past 3 years. Federal regulations
            require verification of your residence history to ensure compliance with safety standards.
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Current Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 border-blue-200 bg-blue-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Address</h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Street Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main Street"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="currentCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            City <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Dallas"
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
                      name="currentState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            State <span className="text-red-500">*</span>
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
                      name="currentZip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            ZIP Code <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="75227"
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
                    name="currentDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          How long have you lived at this address? <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2 years 6 months"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 3+ Years Question */}
                  <FormField
                    control={form.control}
                    name="livedHereThreeYears"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-green-200 bg-green-50 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-base font-medium text-green-800">
                            I have lived at this address for 3 or more years
                          </FormLabel>
                          <p className="text-sm text-green-700">
                            If checked, you won't need to provide previous addresses
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Previous Addresses - Only show if they haven't lived at current address for 3+ years */}
            {!livedHereThreeYears && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Previous Addresses (Past 3 Years)
                    <span className="text-sm font-normal text-blue-600 block">
                      At least one complete address required
                    </span>
                  </h3>
                  <Button
                    type="button"
                    onClick={() => append({ address: '', city: '', state: '', zip: '', duration: '' })}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Address
                  </Button>
                </div>

                {/* Show validation error for the array if needed */}
                {form.formState.errors.previousAddresses?.message && !livedHereThreeYears && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">
                      {form.formState.errors.previousAddresses.message}
                    </p>
                  </div>
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
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}

                        <h4 className="font-medium text-gray-700 mb-4">
                          Previous Address #{index + 1}
                          <span className="text-sm font-normal text-gray-500 ml-2">
                            (Fill all fields to count as complete)
                          </span>
                        </h4>

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name={`previousAddresses.${index}.address`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Street Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="456 Oak Avenue"
                                    {...field}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name={`previousAddresses.${index}.city`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 font-medium">City</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Houston"
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
                              name={`previousAddresses.${index}.state`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 font-medium">State</FormLabel>
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
                              name={`previousAddresses.${index}.zip`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 font-medium">ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="77001"
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
                            name={`previousAddresses.${index}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Duration at this address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="6 months"
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
            )}

            {/* Alternative message when 3+ years is checked */}
            {livedHereThreeYears && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 bg-green-50 rounded-lg border border-green-200 text-center"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Great! No Previous Addresses Needed
                </h3>
                <p className="text-green-700">
                  Since you've lived at your current address for 3 or more years,
                  you don't need to provide previous address information.
                </p>
              </motion.div>
            )}

            {/* Note */}
            <motion.div
              className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> {livedHereThreeYears
                  ? "Make sure your current address information is accurate since you've lived there for 3+ years."
                  : "You must provide at least one complete previous address. If you don't have previous addresses within the past 3 years, please contact us at 800-333-8595 for assistance."
                }
              </p>
            </motion.div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
