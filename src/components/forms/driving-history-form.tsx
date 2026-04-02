"use client";

import { useForm as useReactHookForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from '@/lib/form-context';
import { FormLayout } from '@/components/form-layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';

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
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);
  const [frontPreview, setFrontPreview] = useState<string | null>(formData.licenseImageFront || null);
  const [backPreview, setBackPreview] = useState<string | null>(formData.licenseImageBack || null);
  const [licenseErrors, setLicenseErrors] = useState<{ front?: string; back?: string }>({});
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsTestMode(params.get('test') === 'true');
  }, []);

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

  const handleFileUpload = async (file: File, side: 'front' | 'back') => {
    const setter = side === 'front' ? setUploadingFront : setUploadingBack;
    const previewSetter = side === 'front' ? setFrontPreview : setBackPreview;
    const fieldKey = side === 'front' ? 'licenseImageFront' : 'licenseImageBack';

    // Clear error for this side
    setLicenseErrors(prev => ({ ...prev, [side]: undefined }));

    setter(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const result = await res.json();
      if (result.url) {
        updateFormData(fieldKey, result.url);
        previewSetter(result.url);
      }
    } catch {
      // Upload failed silently
    } finally {
      setter(false);
    }
  };

  const onSubmit = (data: DrivingHistoryFormData) => {
    // Validate license uploads (skip in test mode)
    if (!isTestMode) {
      const errors: { front?: string; back?: string } = {};
      const currentFront = frontPreview || formData.licenseImageFront;
      const currentBack = backPreview || formData.licenseImageBack;

      if (!currentFront) {
        errors.front = "Driver's license front photo is required";
      }
      if (!currentBack) {
        errors.back = "Driver's license back photo is required";
      }

      if (errors.front || errors.back) {
        setLicenseErrors(errors);
        return;
      }
    }

    Object.keys(data).forEach(key => {
      updateFormData(key, data[key as keyof DrivingHistoryFormData]);
    });
    setCurrentStep(4);
  };

  const isValid = form.formState.isValid;
  const hasBothLicenseImages = isTestMode || (!!(frontPreview || formData.licenseImageFront) && !!(backPreview || formData.licenseImageBack));

  return (
    <FormLayout
      title="Driver License & Driving History"
      canGoNext={isValid && hasBothLicenseImages}
      canGoPrevious={true}
      onNext={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600 mb-4">
          Please provide your complete driver license information and driving history for the past 3 years.
          This information is required by federal regulations and will be verified.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Driver License Information */}
            <div className="border border-gray-300 p-4">
              <div className="bg-gray-100 -mx-4 -mt-4 mb-4 px-4 py-2 border-b border-gray-300">
                <h3 className="text-xs font-bold text-gray-700 uppercase">Driver License Information</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          License Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" {...field} className="border-gray-300 text-sm" />
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
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          State Issued <span className="text-red-500">*</span>
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
                    name="licenseExpiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase">
                          Expiration Date <span className="text-red-500">*</span>
                        </FormLabel>
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
                  name="cdlClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-700 uppercase">CDL Class (if applicable)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A, B, or C" {...field}
                          maxLength={1}
                          style={{ textTransform: 'uppercase' }}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                          className="border-gray-300 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* License Photo Upload */}
            <div className="border border-gray-300 p-4">
              <div className="bg-gray-100 -mx-4 -mt-4 mb-4 px-4 py-2 border-b border-gray-300">
                <h3 className="text-xs font-bold text-gray-700 uppercase">Driver&apos;s License Photo Upload <span className="text-red-500">*</span></h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Upload a clear photo of the front and back of your driver&apos;s license. Accepted formats: JPG, PNG, PDF. <strong>Both photos are required.</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Front */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    License Front <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'front');
                    }}
                    className="block w-full text-sm text-gray-600 border border-gray-300 p-2 file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  {uploadingFront && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                  {frontPreview && !uploadingFront && (
                    <div className="mt-2">
                      <img src={frontPreview} alt="License front" className="h-24 border border-gray-300 object-cover" />
                      <p className="text-xs text-green-600 mt-1">Uploaded</p>
                    </div>
                  )}
                  {licenseErrors.front && (
                    <p className="text-red-500 text-xs mt-1">{licenseErrors.front}</p>
                  )}
                </div>
                {/* Back */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    License Back <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'back');
                    }}
                    className="block w-full text-sm text-gray-600 border border-gray-300 p-2 file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  {uploadingBack && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                  {backPreview && !uploadingBack && (
                    <div className="mt-2">
                      <img src={backPreview} alt="License back" className="h-24 border border-gray-300 object-cover" />
                      <p className="text-xs text-green-600 mt-1">Uploaded</p>
                    </div>
                  )}
                  {licenseErrors.back && (
                    <p className="text-red-500 text-xs mt-1">{licenseErrors.back}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Endorsements & Restrictions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-gray-300 p-4">
                <div className="bg-gray-100 -mx-4 -mt-4 mb-4 px-4 py-2 border-b border-gray-300">
                  <h3 className="text-xs font-bold text-gray-700 uppercase">Endorsements</h3>
                </div>
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
                            render={({ field }) => (
                              <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(field.value?.filter((v) => v !== option.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border border-gray-300 p-4">
                <div className="bg-gray-100 -mx-4 -mt-4 mb-4 px-4 py-2 border-b border-gray-300">
                  <h3 className="text-xs font-bold text-gray-700 uppercase">Restrictions</h3>
                </div>
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
                            render={({ field }) => (
                              <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(field.value?.filter((v) => v !== option.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Accidents */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800">Traffic Accidents (Past 3 Years)</h3>
                <button
                  type="button"
                  onClick={() => appendAccident({ date: '', description: '', fatalities: false, injuries: false })}
                  className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                >
                  + Add Accident
                </button>
              </div>

              {accidentFields.length === 0 && (
                <div className="border border-gray-300 p-4 text-center text-sm text-gray-500">
                  No accidents reported. Click &quot;Add Accident&quot; if you have any to report.
                </div>
              )}

              <div className="space-y-3">
                {accidentFields.map((field, index) => (
                  <div key={field.id} className="border border-gray-300 p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeAccident(index)}
                      className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                    <h4 className="text-xs font-bold text-gray-600 uppercase mb-3">Accident #{index + 1}</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name={`accidents.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="border-gray-300 text-sm" />
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
                              <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief description" {...field} className="border-gray-300 text-sm" />
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
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Fatalities involved</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`accidents.${index}.injuries`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Injuries involved</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Violations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800">Traffic Violations (Past 3 Years)</h3>
                <button
                  type="button"
                  onClick={() => appendViolation({ date: '', violation: '', location: '' })}
                  className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                >
                  + Add Violation
                </button>
              </div>

              {violationFields.length === 0 && (
                <div className="border border-gray-300 p-4 text-center text-sm text-gray-500">
                  No violations reported. Click &quot;Add Violation&quot; if you have any to report.
                </div>
              )}

              <div className="space-y-3">
                {violationFields.map((field, index) => (
                  <div key={field.id} className="border border-gray-300 p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeViolation(index)}
                      className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                    <h4 className="text-xs font-bold text-gray-600 uppercase mb-3">Violation #{index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <FormField
                        control={form.control}
                        name={`violations.${index}.date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="border-gray-300 text-sm" />
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
                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Violation Type</FormLabel>
                            <FormControl>
                              <Input placeholder="Speeding, DUI, etc." {...field} className="border-gray-300 text-sm" />
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
                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase">Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} className="border-gray-300 text-sm" />
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

            <div className="p-3 bg-red-50 border border-red-200 text-sm text-red-800">
              <strong>Important:</strong> You must report ALL accidents and violations, even if charges were dismissed.
              Failure to disclose may result in disqualification.
            </div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
