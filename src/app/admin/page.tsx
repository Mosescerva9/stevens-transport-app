"use client";

import { useState, useEffect } from 'react';
import { Users, Eye, FileText, Calendar, Phone, Mail, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  socialSecurity: string;
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentZip: string;
  currentEmployer: string;
  currentPosition: string;
  licenseNumber: string;
  licenseState: string;
  licenseExpiration: string;
  cdlClass?: string;
  licenseImageFront?: string;
  licenseImageBack?: string;
  hasConvictions: boolean;
  convictionsDetails?: string;
  canLiftFiftyLbs: boolean;
  availableWeekends: boolean;
  expectedPay?: string;
  howHeardAboutUs?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  signature?: string;
  signatureDate?: string;
  createdAt: string;
  status: string;
  notes?: string;
  previousAddresses: Array<Record<string, string>>;
  previousEmployment: Array<Record<string, string>>;
  accidents: Array<Record<string, string | boolean>>;
  violations: Array<Record<string, string>>;
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'allied2026')) {
      setAuthed(true);
      fetchApplications();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/applications');
      const result = await response.json();
      if (result.success) {
        setApplications(result.data.applications);
      } else {
        setError('Failed to fetch applications');
      }
    } catch {
      setError('Error fetching applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
      if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status });
    } catch {
      console.error('Failed to update status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-sm w-full">
          <div className="text-center mb-6">
            <div className="bg-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">AR</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Allied Refreshment Distributing</p>
          </div>
          <input type="password" placeholder="Enter admin password"
            className="w-full border rounded-lg p-3 mb-3 text-sm"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(null); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          <Button onClick={handleLogin} className="w-full bg-blue-700 text-white">Sign In</Button>
        </Card>
      </div>
    );
  }

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
      <header className="bg-blue-800 text-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-blue-800 font-bold text-sm">AR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Allied Refreshment Distributing</h1>
              <p className="text-blue-200 text-sm">Driver Application Management</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5"><div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg"><Users className="w-5 h-5 text-blue-600" /></div>
            <div><p className="text-2xl font-bold">{applications.length}</p><p className="text-gray-500 text-sm">Total</p></div>
          </div></Card>
          <Card className="p-5"><div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg"><FileText className="w-5 h-5 text-yellow-600" /></div>
            <div><p className="text-2xl font-bold">{applications.filter(a => a.status === 'submitted').length}</p><p className="text-gray-500 text-sm">Pending</p></div>
          </div></Card>
          <Card className="p-5"><div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg"><Calendar className="w-5 h-5 text-green-600" /></div>
            <div><p className="text-2xl font-bold">{applications.filter(a => a.status === 'approved').length}</p><p className="text-gray-500 text-sm">Approved</p></div>
          </div></Card>
          <Card className="p-5"><div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg"><Eye className="w-5 h-5 text-purple-600" /></div>
            <div><p className="text-2xl font-bold">{applications.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString()).length}</p><p className="text-gray-500 text-sm">Today</p></div>
          </div></Card>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b"><h2 className="text-lg font-semibold">Applications</h2></div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.firstName} {app.lastName}</div>
                      <div className="text-xs text-gray-500">ID: {app.id.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1"><Mail className="w-3 h-3" />{app.email}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" />{app.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>{app.licenseState} {app.licenseNumber}</div>
                      <div className="text-xs text-gray-500">Exp: {app.licenseExpiration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(app.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>{app.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button onClick={() => setSelectedApp(app)} variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" /> View
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
              <p className="text-gray-500">No applications yet</p>
              <p className="text-sm text-gray-400">Applications will appear here once submitted</p>
            </div>
          )}
        </Card>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">{selectedApp.firstName} {selectedApp.lastName} — Full Application</h3>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => updateStatus(selectedApp.id, 'approved')} className="bg-green-600 text-white text-xs">Approve</Button>
                <Button size="sm" onClick={() => updateStatus(selectedApp.id, 'under_review')} className="bg-blue-600 text-white text-xs">Under Review</Button>
                <Button size="sm" onClick={() => updateStatus(selectedApp.id, 'rejected')} className="bg-red-600 text-white text-xs">Reject</Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedApp(null)}>✕</Button>
              </div>
            </div>

            <div className="p-6 space-y-6 text-sm">
              {/* Personal */}
              <DetailSection title="Personal Information">
                <DetailRow label="Full Name" value={`${selectedApp.firstName} ${selectedApp.middleName || ''} ${selectedApp.lastName}`} />
                <DetailRow label="DOB" value={selectedApp.dateOfBirth} />
                <DetailRow label="SSN" value={selectedApp.socialSecurity} />
                <DetailRow label="Phone" value={selectedApp.phone} />
                <DetailRow label="Email" value={selectedApp.email} />
                <DetailRow label="Address" value={`${selectedApp.currentAddress}, ${selectedApp.currentCity}, ${selectedApp.currentState} ${selectedApp.currentZip}`} />
              </DetailSection>

              {/* License + Images */}
              <DetailSection title="Driver's License (MVR Data)">
                <DetailRow label="License #" value={selectedApp.licenseNumber} />
                <DetailRow label="State" value={selectedApp.licenseState} />
                <DetailRow label="Expiration" value={selectedApp.licenseExpiration} />
                <DetailRow label="CDL Class" value={selectedApp.cdlClass || 'None'} />
                {(selectedApp.licenseImageFront || selectedApp.licenseImageBack) && (
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    {selectedApp.licenseImageFront && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Front</p>
                        <a href={selectedApp.licenseImageFront} target="_blank" rel="noopener noreferrer">
                          <img src={selectedApp.licenseImageFront} alt="License Front" className="rounded border max-h-48 object-contain" />
                        </a>
                      </div>
                    )}
                    {selectedApp.licenseImageBack && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Back</p>
                        <a href={selectedApp.licenseImageBack} target="_blank" rel="noopener noreferrer">
                          <img src={selectedApp.licenseImageBack} alt="License Back" className="rounded border max-h-48 object-contain" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </DetailSection>

              {/* Employment */}
              <DetailSection title="Employment History">
                <DetailRow label="Current Employer" value={selectedApp.currentEmployer} />
                <DetailRow label="Position" value={selectedApp.currentPosition} />
                {selectedApp.previousEmployment.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium text-gray-700 mb-1">Previous Employers:</p>
                    {selectedApp.previousEmployment.map((emp, i) => (
                      <div key={i} className="border-l-2 border-blue-200 pl-3 mb-2">
                        <p className="font-medium">{emp.employer} — {emp.position}</p>
                        <p className="text-gray-500">{emp.startDate} to {emp.endDate} | {emp.salary}</p>
                        <p className="text-gray-500">Left because: {emp.reasonForLeaving}</p>
                      </div>
                    ))}
                  </div>
                )}
              </DetailSection>

              {/* Driving History */}
              <DetailSection title="Driving History">
                <DetailRow label="Accidents" value={selectedApp.accidents.length > 0 ? `${selectedApp.accidents.length} reported` : 'None'} />
                {selectedApp.accidents.map((acc, i) => (
                  <div key={i} className="border-l-2 border-red-200 pl-3 mb-1">
                    <p>{acc.date}: {acc.description} {acc.fatalities ? '⚠️ FATALITIES' : ''} {acc.injuries ? '🏥 Injuries' : ''}</p>
                  </div>
                ))}
                <DetailRow label="Violations" value={selectedApp.violations.length > 0 ? `${selectedApp.violations.length} reported` : 'None'} />
                {selectedApp.violations.map((v, i) => (
                  <div key={i} className="border-l-2 border-yellow-200 pl-3 mb-1">
                    <p>{v.date}: {v.violation} — {v.location}</p>
                  </div>
                ))}
              </DetailSection>

              {/* Additional */}
              <DetailSection title="Additional Information">
                <DetailRow label="Convictions" value={selectedApp.hasConvictions ? `Yes — ${selectedApp.convictionsDetails}` : 'No'} />
                <DetailRow label="Can lift 50+ lbs" value={selectedApp.canLiftFiftyLbs ? 'Yes' : 'No'} />
                <DetailRow label="Available weekends" value={selectedApp.availableWeekends ? 'Yes' : 'No'} />
                <DetailRow label="Expected pay" value={selectedApp.expectedPay || '—'} />
                <DetailRow label="How heard" value={selectedApp.howHeardAboutUs || '—'} />
                <DetailRow label="Emergency Contact" value={selectedApp.emergencyContactName ? `${selectedApp.emergencyContactName} (${selectedApp.emergencyContactRelation}) — ${selectedApp.emergencyContactPhone}` : '—'} />
                <DetailRow label="Signature" value={selectedApp.signature || '—'} />
                <DetailRow label="Signed Date" value={selectedApp.signatureDate || '—'} />
              </DetailSection>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-medium text-xs uppercase tracking-wide text-gray-700">{title}</div>
      <div className="p-4 space-y-1">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-36 shrink-0">{label}:</span>
      <span className="text-gray-900">{value || '—'}</span>
    </div>
  );
}
