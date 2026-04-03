"use client";

import { FormProvider } from '@/lib/form-context';
import AppFormLayout from '@/components/form-layout';

export default function ApplyPage() {
  return (
    <FormProvider>
      <AppFormLayout />
    </FormProvider>
  );
}
