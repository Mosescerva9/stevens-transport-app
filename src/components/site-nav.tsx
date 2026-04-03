"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/careers', label: 'Careers' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Allied Refreshment Company" className="h-10" />
        </Link>
        <nav className="flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-[#c0392b]'
                  : 'text-gray-600 hover:text-[#c0392b]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/careers"
            className="px-5 py-2 text-sm font-semibold text-white bg-[#c0392b] hover:bg-[#a93226] transition-colors"
          >
            We're Hiring
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/logo.png" alt="Allied Refreshment Company" className="h-10 brightness-0 invert mb-4" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Proudly distributing quality beverages across the Kansas City metro area.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/apply" className="text-gray-300 hover:text-white transition-colors">Apply Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Kansas City, MO</li>
              <li><a href="tel:+18165314275" className="hover:text-white transition-colors">(816) 531-4275</a></li>
              <li><a href="mailto:hiring@alliedrefreshmentdistributing.com" className="hover:text-white transition-colors">hiring@alliedrefreshmentdistributing.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Allied Refreshment Company. All rights reserved. Equal Opportunity Employer.
          </p>
        </div>
      </div>
    </footer>
  );
}
