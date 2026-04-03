"use client";

import Link from 'next/link';
import { SiteNav, SiteFooter } from '@/components/site-nav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      {/* Hero Section with Background Image */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
          alt="Delivery truck on the road"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#e74c3c] uppercase tracking-wider mb-3">Kansas City, Missouri</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Kansas City's Trusted Beverage Distributor
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Allied Refreshment Company delivers quality beverages to businesses, restaurants, and retailers across the Kansas City metro area. Built on reliability, hard work, and strong relationships.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/careers"
                className="px-6 py-3 text-sm font-semibold bg-[#c0392b] text-white hover:bg-[#a93226] transition-colors"
              >
                View Open Positions
              </Link>
              <Link
                href="/apply"
                className="px-6 py-3 text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-[#1a1a1a] transition-colors"
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
            <div>
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80"
                alt="Warehouse operations with beverage products"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#c0392b] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-3xl font-bold">KC Metro</p>
              <p className="text-sm text-red-200 mt-1">Service Area</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm text-red-200 mt-1">Local Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">Daily</p>
              <p className="text-sm text-red-200 mt-1">Deliveries</p>
            </div>
            <div>
              <p className="text-3xl font-bold">Growing</p>
              <p className="text-sm text-red-200 mt-1">Team</p>
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
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04eefb3e78b4?w=600&q=80"
                alt="Delivery driver with clipboard"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Reliability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our customers count on us to deliver — on time, every time. Consistency is the foundation of everything we do.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?w=600&q=80"
                alt="Worker loading delivery truck"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Hard Work</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We're a team of people who take pride in getting the job done. Every route, every delivery, every day.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
                alt="Team members shaking hands"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Growth</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We invest in our people. From paid training to advancement opportunities, we want you to grow with us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&q=80"
          alt="Box truck on delivery route"
          className="w-full h-48 object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80"
          alt="Beverage products on shelves"
          className="w-full h-48 object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80"
          alt="Kansas City skyline"
          className="w-full h-48 object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=80"
          alt="Warehouse worker with hand truck"
          className="w-full h-48 object-cover"
        />
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80"
          alt="Kansas City cityscape"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Team?</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            We're always looking for reliable, hardworking people to join the Allied Refreshment family. Check out our open positions and apply today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/careers"
              className="px-6 py-3 text-sm font-semibold bg-[#c0392b] text-white hover:bg-[#a93226] transition-colors"
            >
              View Open Positions
            </Link>
            <Link
              href="/apply"
              className="px-6 py-3 text-sm font-semibold border-2 border-[#c0392b] text-[#c0392b] hover:bg-[#c0392b] hover:text-white transition-colors"
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
