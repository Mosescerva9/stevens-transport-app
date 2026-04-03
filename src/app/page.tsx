"use client";

import Link from 'next/link';
import { SiteNav, SiteFooter } from '@/components/site-nav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      {/* Hero Section */}
      <section className="bg-[#c0392b] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Kansas City's Trusted Beverage Distributor
            </h1>
            <p className="text-lg text-red-100 leading-relaxed mb-8">
              Allied Refreshment Company delivers quality beverages to businesses, restaurants, and retailers across the Kansas City metro area. Built on reliability, hard work, and strong relationships.
            </p>
            <div className="flex gap-4">
              <Link
                href="/careers"
                className="px-6 py-3 text-sm font-semibold bg-white text-[#c0392b] hover:bg-gray-100 transition-colors"
              >
                View Open Positions
              </Link>
              <Link
                href="/apply"
                className="px-6 py-3 text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-[#c0392b] transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Allied Refreshment Company</h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Allied Refreshment Company is a growing beverage distribution company headquartered in Kansas City, Missouri. We partner with local businesses, restaurants, convenience stores, and retail locations to deliver a wide range of beverage products — reliably and on time.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our team is the backbone of our operation. From our drivers to our warehouse staff, every member plays a critical role in keeping Kansas City refreshed. We pride ourselves on building long-term relationships with both our customers and our employees.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a business looking for a dependable distribution partner or a hardworking individual looking for a rewarding career — Allied Refreshment Company is here for you.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-[#c0392b]">KC Metro</p>
                  <p className="text-sm text-gray-500 mt-1">Service Area</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#c0392b]">100+</p>
                  <p className="text-sm text-gray-500 mt-1">Local Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#c0392b]">Daily</p>
                  <p className="text-sm text-gray-500 mt-1">Deliveries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#c0392b]">Growing</p>
                  <p className="text-sm text-gray-500 mt-1">Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Value */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Value</h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 p-8">
              <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-4">
                <span className="text-[#c0392b] text-2xl font-bold">01</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our customers count on us to deliver — on time, every time. Consistency is the foundation of everything we do.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8">
              <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-4">
                <span className="text-[#c0392b] text-2xl font-bold">02</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Hard Work</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We're a team of people who take pride in getting the job done. Every route, every delivery, every day.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8">
              <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-4">
                <span className="text-[#c0392b] text-2xl font-bold">03</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Growth</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We invest in our people. From paid training to advancement opportunities, we want you to grow with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#c0392b] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            We're always looking for reliable, hardworking people to join the Allied Refreshment family. Check out our open positions and apply today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/careers"
              className="px-6 py-3 text-sm font-semibold bg-white text-[#c0392b] hover:bg-gray-100 transition-colors"
            >
              View Open Positions
            </Link>
            <Link
              href="/apply"
              className="px-6 py-3 text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-[#c0392b] transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
