"use client";

import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const params = useSearchParams();
  const ref = params.get('ref');

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-300 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <img src="/logo.png" alt="Allied Refreshment Distributing" className="h-14 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Allied Refreshment Distributing</h1>
            <p className="text-sm text-gray-500">Kansas City, MO &nbsp;|&nbsp; hiring@alliedrefreshmentdistributing.com</p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <div className="border border-gray-300 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Application Submitted</h2>
          <p className="text-sm text-gray-600 mb-4">
            Thank you for applying to Allied Refreshment Distributing.
            We will review your application and contact you within 48 hours.
          </p>
          {ref && (
            <div className="bg-gray-100 border border-gray-300 p-3 mb-4">
              <p className="text-xs text-gray-500 uppercase font-medium">Reference Number</p>
              <p className="font-mono font-bold text-gray-900">{ref}</p>
            </div>
          )}
          <p className="text-sm text-gray-500">
            Questions? Email us at <strong>hiring@alliedrefreshmentdistributing.com</strong>
          </p>
          <p className="text-sm text-gray-400 mt-4">
            You may now close this window.
          </p>
        </div>
      </div>
    </div>
  );
}
