"use client";

import { useForm as useReactHookForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

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
  if (data.livedHereThreeYears) return true;
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
    const completeAddresses = data.livedHereThreeYears ? [] : data.previousAddresses.filter(addr =>
      addr.address.trim() && addr.city.trim() && addr.state.trim() && addr.zip.trim() && addr.duration.trim()
    );

    updateFormData('currentAddress', data.currentAddress);
    updateFormData('currentCity', data.currentCity);
    updateFormData('currentState', data.currentState);
    updateFormData('currentZip', data.currentZip);
    updateFormData('currentDuration', data.currentDuration);
    updateFormData('livedHereThreeYears', data.livedHereThreeYears);
    updateFormData('previousAddresses', completeAddresses);
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
      <div className="space-y-6">
        <p className="text-sm text-gray-600 mb-4">
          Please provide your complete address history for the past 3 years. Federal regulations
          require verification of your residence history.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Address */}
            <div className="border border-gray-300 p-4">
              <div className="bg-gray-100 -mx-4 -mt-4 mb-4 px-4 py-2 border-b border-gray-300">
                <h3 className="text-xs font-bold text-gray-700 uppercase">Current Address</h3>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                        Street Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} className="border-gray-300 text-sm" />
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
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          City <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Dallas" {...field} className="border-gray-300 text-sm" />
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
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          State <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="TX" {...field}
                            maxLength={2}
                            style={{ textTransform: 'uppercase' }}
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            className="border-gray-300 text-sm"
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
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          ZIP Code <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="75227" {...field} className="border-gray-300 text-sm" />
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
                      <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                        How long at this address? <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="2 years 6 months" {...field} className="border-gray-300 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="livedHereThreeYears"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-gray-300 p-3 bg-gray-50">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-gray-800">
                          I have lived at this address for 3 or more years
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          If checked, you won&apos;t need to provide previous addresses
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Previous Addresses */}
            {!livedHereThreeYears && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-800">
                    Previous Addresses (Past 3 Years)
                    <span className="text-xs font-normal text-gray-500 ml-2">At least one required</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => append({ address: '', city: '', state: '', zip: '', duration: '' })}
                    className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                  >
                    + Add Address
                  </button>
                </div>

                {form.formState.errors.previousAddresses?.message && (
                  <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 text-sm">
                    {form.formState.errors.previousAddresses.message}
                  </div>
                )}

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border border-gray-300 p-4 relative">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                      <h4 className="text-xs font-bold text-gray-600 uppercase mb-3">Previous Address #{index + 1}</h4>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name={`previousAddresses.${index}.address`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="456 Oak Avenue" {...field} className="border-gray-300 text-sm" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name={`previousAddresses.${index}.city`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase">City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Houston" {...field} className="border-gray-300 text-sm" />
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
                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase">State</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="TX" {...field}
                                    maxLength={2}
                                    style={{ textTransform: 'uppercase' }}
                                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    className="border-gray-300 text-sm"
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
                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase">ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="77001" {...field} className="border-gray-300 text-sm" />
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
                              <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Duration</FormLabel>
                              <FormControl>
                                <Input placeholder="6 months" {...field} className="border-gray-300 text-sm" />
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
            )}

            {livedHereThreeYears && (
              <div className="p-4 bg-gray-50 border border-gray-300 text-center text-sm text-gray-600">
                Since you&apos;ve lived at your current address for 3+ years, no previous addresses are needed.
              </div>
            )}

            <div className="p-3 bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
              <strong>Important:</strong> {livedHereThreeYears
                ? "Make sure your current address information is accurate."
                : "You must provide at least one complete previous address. If you need help, email us at hiring@alliedrefreshmentdistributing.com."
              }
            </div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
