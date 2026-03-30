"use client";

import { Suspense } from 'react';
import ThankYouPage from '@/components/thank-you-page';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ThankYouPage />
    </Suspense>
  );
}
