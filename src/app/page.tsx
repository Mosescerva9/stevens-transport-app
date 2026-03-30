"use client";

import { FormProvider } from '@/lib/form-context';
import AppFormLayout from '@/components/form-layout';

export default function Home() {
  return (
    <FormProvider>
      <AppFormLayout />
    </FormProvider>
  );
}
