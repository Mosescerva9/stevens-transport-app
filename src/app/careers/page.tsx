"use client";

import Link from 'next/link';
import { SiteNav, SiteFooter } from '@/components/site-nav';

const jobListings = [
  {
    id: 'delivery-driver',
    title: 'Delivery Driver',
    type: 'Full-Time',
    location: 'Kansas City, MO',
    pay: 'Competitive Hourly + Overtime',
    description: 'Drive a company vehicle on local delivery routes throughout the Kansas City metro area. Load and unload product at customer locations, maintain delivery logs, and build relationships with customers.',
    requirements: [
      'Valid driver\'s license (CDL preferred but not required)',
      'Clean driving record',
      'Ability to lift 50+ lbs repeatedly',
      'Reliable and punctual',
      'Must pass background check and drug screening',
    ],
    benefits: [
      'Competitive hourly pay with overtime opportunities',
      'Consistent local routes — home every night',
      'Paid training provided',
      'Full-time, year-round position',
      'Room for growth within the company',
    ],
    urgent: true,
  },
  {
    id: 'warehouse-associate',
    title: 'Warehouse Associate',
    type: 'Full-Time',
    location: 'Kansas City, MO',
    pay: 'Competitive Hourly',
    description: 'Assist with loading and organizing beverage products in our warehouse. Prepare orders for delivery, maintain inventory accuracy, and keep the warehouse clean and organized.',
    requirements: [
      'Ability to lift 50+ lbs repeatedly',
      'Reliable and detail-oriented',
      'Previous warehouse experience is a plus',
      'Must pass background check and drug screening',
    ],
    benefits: [
      'Competitive hourly pay',
      'Consistent schedule',
      'Team-oriented work environment',
      'Opportunity for advancement to driver roles',
    ],
    urgent: false,
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      {/* Hero */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Careers at Allied Refreshment Company</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Join a growing team that values hard work, reliability, and taking care of its people. See our open positions below.
          </p>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-[#c0392b]">Local</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Routes — Home Every Night</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#c0392b]">Paid</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Training Provided</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#c0392b]">OT</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Overtime Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#c0392b]">Growth</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Advancement Opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>

          <div className="space-y-6">
            {jobListings.map(job => (
              <div key={job.id} className="border border-gray-200 bg-white">
                {/* Job Header */}
                <div className="px-6 py-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      {job.urgent && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-[#c0392b]">URGENTLY HIRING</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{job.type}</span>
                      <span>|</span>
                      <span>{job.location}</span>
                      <span>|</span>
                      <span>{job.pay}</span>
                    </div>
                  </div>
                  <Link
                    href="/apply"
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-[#c0392b] hover:bg-[#a93226] transition-colors text-center"
                  >
                    Apply Now
                  </Link>
                </div>

                {/* Job Details */}
                <div className="px-6 py-5">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-gray-400 mt-0.5">&#8226;</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">What We Offer</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((ben, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-[#c0392b] mt-0.5">&#10003;</span>
                            {ben}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Apply CTA */}
      <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Don't See the Right Fit?</h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            We're always looking for great people. Send your resume to our hiring team and we'll reach out when a position opens up.
          </p>
          <a
            href="mailto:hiring@alliedrefreshmentdistributing.com"
            className="px-6 py-3 text-sm font-semibold border-2 border-[#c0392b] text-[#c0392b] hover:bg-[#c0392b] hover:text-white transition-colors inline-block"
          >
            Email Your Resume
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
