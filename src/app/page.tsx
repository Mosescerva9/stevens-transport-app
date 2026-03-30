"use client";

import { FormProvider } from '@/lib/form-context';
import FormLayout from '@/components/form-layout';

export default function Home() {
  return (
    <FormProvider>
      <FormLayout />
    </FormProvider>
  );
}
