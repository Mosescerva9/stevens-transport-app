"use client";

import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, MapPin, Truck, Shield, Award } from 'lucide-react';
import { FormLayout } from './form-layout';
import { Card } from './ui/card';
import { useForm } from '@/lib/form-context';
import Image from 'next/image';

export function ThankYouPage() {
  const { formData } = useForm();
  const submissionResult = formData.submissionResult;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-start">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://ext.same-assets.com/610977211/2678858071.png"
              alt="Stevens Transport"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Company Info */}
          <motion.div
            className="text-right text-sm text-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="font-semibold">Stevens Transport, Inc.</div>
            <div>9757 Military Parkway</div>
            <div>Dallas, TX 75227</div>
            <div>800-333-8595</div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Thank You Header */}
          <motion.div
            className="bg-green-100 border border-green-200 rounded-lg px-6 py-4 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-lg font-medium text-green-800">Application Complete - Thank You!</h1>
          </motion.div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center space-y-8">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3, delay: 0.3 }}
                className="flex justify-center"
              >
                <div className="bg-green-100 rounded-full p-6">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              </motion.div>

              {/* Thank You Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold text-gray-900">
                  Thank You, {formData.firstName}!
                </h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                  Your driver application has been successfully submitted to Stevens Transport, Inc.
                  We appreciate your interest in joining our team.
                </p>
              </motion.div>

              {/* Application Details */}
              {submissionResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto"
                >
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Application Details</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Reference Number:</span>
                      <span className="font-mono text-sm bg-blue-100 px-3 py-1 rounded font-semibold">
                        {submissionResult.referenceNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Submitted:</span>
                      <span className="text-sm text-blue-800">
                        {new Date(submissionResult.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* What's Next */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">What Happens Next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-3">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Review Process</h4>
                    <p className="text-sm text-gray-600">Our team will review your application within 24-48 hours</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-3">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                    <p className="text-sm text-gray-600">If qualified, we'll contact you for the next steps</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-3">
                      <Truck className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Join Our Team</h4>
                    <p className="text-sm text-gray-600">Begin your career with Stevens Transport</p>
                  </div>
                </div>
              </motion.div>

              {/* Why Stevens Transport */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="border-t border-gray-200 pt-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Choose Stevens Transport?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3">🚛</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Modern Fleet</h4>
                    <p className="text-sm text-gray-600">Late model trucks equipped with the latest technology and comfort features</p>
                  </Card>

                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3">💰</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Competitive Pay</h4>
                    <p className="text-sm text-gray-600">Industry-leading compensation packages with performance bonuses</p>
                  </Card>

                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3">🏠</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Home Time</h4>
                    <p className="text-sm text-gray-600">Regular home time options to maintain work-life balance</p>
                  </Card>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="border-t border-gray-200 pt-8"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions? We're Here to Help</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-900">Call Us</div>
                      <div className="text-blue-700">800-333-8595</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-900">Email</div>
                      <div className="text-blue-700">hr@stevenstransport.com</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-900">Visit</div>
                      <div className="text-blue-700">Dallas, TX 75227</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Final Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">Welcome to the Stevens Transport Family</span>
                </div>
                <p className="text-green-800 text-sm">
                  Thank you for choosing Stevens Transport as your potential career destination.
                  We look forward to reviewing your application and potentially welcoming you to our team of professional drivers.
                </p>
                {submissionResult && (
                  <p className="text-green-700 text-xs mt-2">
                    Please save your reference number <strong>{submissionResult.referenceNumber}</strong> for future reference.
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        {/* Copyright */}
        <div className="px-6 py-4 text-center text-sm text-gray-600">
          <div className="max-w-4xl mx-auto">
            <a href="#" className="stevens-blue-text hover:underline mr-4 transition-colors">
              Tenstreet Privacy Policy
            </a>
            <span>© Copyright 2006-2025, Tenstreet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
