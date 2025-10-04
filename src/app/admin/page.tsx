"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, FileText, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PreviousAddress {
  address: string;
  city: string;
  state: string;
  zip: string;
  duration: string;
}

interface PreviousEmployment {
  employer: string;
  position: string;
  startDate: string;
  endDate: string;
  salary: string;
  reasonForLeaving: string;
}

interface Accident {
  date: string;
  description: string;
  fatalities: boolean;
  injuries: boolean;
}

interface Violation {
  date: string;
  violation: string;
  location: string;
}

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentEmployer: string;
  createdAt: string;
  status: string;
  previousAddresses: PreviousAddress[];
  previousEmployment: PreviousEmployment[];
  accidents: Accident[];
  violations: Violation[];
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const result = await response.json();

      if (result.success) {
        setApplications(result.data.applications);
      } else {
        setError('Failed to fetch applications');
      }
    } catch (err) {
      setError('Error fetching applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stevens Transport Admin</h1>
              <p className="text-gray-600">Driver Application Management</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                  <p className="text-gray-600">Total Applications</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'submitted').length}
                  </p>
                  <p className="text-gray-600">Pending Review</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app =>
                      new Date(app.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                  <p className="text-gray-600">Today</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.reduce((sum, app) =>
                      sum + app.previousEmployment.length + app.accidents.length + app.violations.length, 0
                    )}
                  </p>
                  <p className="text-gray-600">Total Records</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Employer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-2 mr-3">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {app.firstName} {app.lastName}
                            </div>
                            <div className="text-sm text-gray-500">ID: {app.id.slice(-8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {app.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {app.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.currentEmployer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(app.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'submitted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          onClick={() => setSelectedApp(app)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {applications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No applications submitted yet</p>
                <p className="text-sm text-gray-400 mt-2">Applications will appear here once submitted</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Application Detail Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Details - {selectedApp.firstName} {selectedApp.lastName}
                </h3>
                <Button
                  onClick={() => setSelectedApp(null)}
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Email:</strong> {selectedApp.email}</p>
                      <p><strong>Phone:</strong> {selectedApp.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Current Employment</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Employer:</strong> {selectedApp.currentEmployer}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Previous Addresses</h5>
                    <p className="text-2xl font-bold text-blue-600">{selectedApp.previousAddresses.length}</p>
                  </Card>

                  <Card className="p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Employment History</h5>
                    <p className="text-2xl font-bold text-green-600">{selectedApp.previousEmployment.length}</p>
                  </Card>

                  <Card className="p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Incidents</h5>
                    <p className="text-2xl font-bold text-red-600">{selectedApp.accidents.length + selectedApp.violations.length}</p>
                  </Card>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Application Timeline</h4>
                  <div className="text-sm text-gray-600">
                    <p><strong>Submitted:</strong> {formatDate(selectedApp.createdAt)}</p>
                    <p><strong>Status:</strong> <span className="capitalize">{selectedApp.status}</span></p>
                    <p><strong>ID:</strong> {selectedApp.id}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
