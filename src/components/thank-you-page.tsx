"use client";

import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const params = useSearchParams();
  const ref = params.get('ref');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for applying to Allied Refreshment Distributing.
          We will review your application and contact you within 48 hours.
        </p>
        {ref && (
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-500">Reference Number</p>
            <p className="font-mono font-bold text-gray-900">{ref}</p>
          </div>
        )}
        <p className="text-sm text-gray-500">
          Questions? Call us at <strong>(620) 408-4862</strong>
        </p>
      </div>
    </div>
  );
}
