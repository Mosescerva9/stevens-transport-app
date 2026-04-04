"use client";

import { useState } from 'react';

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
  currentDuration?: string;
  livedHereThreeYears?: boolean;
  currentEmployer: string;
  currentPosition: string;
  currentStartDate?: string;
  currentSalary?: string;
  currentReasonForLeaving?: string;
  licenseNumber: string;
  licenseState: string;
  licenseExpiration: string;
  cdlClass?: string;
  endorsements?: string[];
  restrictions?: string[];
  licenseImageFront?: string;
  licenseImageBack?: string;
  hasConvictions: boolean;
  convictionsDetails?: string;
  canLiftFiftyLbs: boolean;
  hasPhysicalLimits?: boolean;
  physicalLimitsDetails?: string;
  availableWeekends: boolean;
  availableOvernight?: boolean;
  expectedPay?: string;
  howHeardAboutUs?: string;
  referredBy?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  signature?: string;
  signatureDate?: string;
  militaryService?: boolean;
  militaryBranch?: string;
  militaryRank?: string;
  militaryDates?: string;
  createdAt: string;
  status: string;
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
    if (password === 'allied2026') {
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
      // silently fail
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'under_review': return 'Under Review';
      default: return 'Submitted';
    }
  };

  const statusClass = (s: string) => {
    switch (s) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  // ── Login Screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="border border-gray-300 p-8 max-w-sm w-full">
          <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900">Allied Refreshment Distributing</h1>
            <p className="text-xs text-gray-500">Admin Dashboard &mdash; Kansas City, MO</p>
          </div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full border border-gray-300 p-2 text-sm mb-3"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(null); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading applications...</p>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Allied Refreshment Distributing &mdash; Admin Dashboard</h1>
            <p className="text-sm text-gray-500">hiring@alliedrefreshmentdistributing.com</p>
          </div>
          <button
            onClick={() => { setAuthed(false); setApplications([]); setPassword(''); }}
            className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-600"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatBox label="Total" value={applications.length} />
          <StatBox label="Pending" value={applications.filter(a => a.status === 'submitted').length} />
          <StatBox label="Approved" value={applications.filter(a => a.status === 'approved').length} />
          <StatBox label="Rejected" value={applications.filter(a => a.status === 'rejected').length} />
        </div>

        {/* Applications Table */}
        <div className="border border-gray-300">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Applications ({applications.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Applicant Name</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Phone</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">License #</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Submitted Date</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{app.firstName} {app.lastName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{app.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{app.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{app.licenseState} {app.licenseNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(app.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs font-semibold ${statusClass(app.status)}`}>
                        {statusLabel(app.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch(`/api/applications/${app.id}`);
                            const result = await res.json();
                            if (result.success) {
                              setSelectedApp(result.data);
                            } else {
                              setSelectedApp(app);
                            }
                          } catch {
                            setSelectedApp(app);
                          }
                        }}
                        className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {applications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No applications yet</p>
              <p className="text-xs text-gray-400 mt-1">Applications will appear here once submitted</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-300 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-3 border-b border-gray-300 bg-gray-100 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase">
                  {selectedApp.firstName} {selectedApp.lastName} &mdash; Application Detail
                </h3>
                <span className={`text-xs font-semibold px-2 py-0.5 ${statusClass(selectedApp.status)}`}>
                  {statusLabel(selectedApp.status)}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(selectedApp.id, 'approved')} className="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700">Approve</button>
                <button onClick={() => updateStatus(selectedApp.id, 'under_review')} className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700">Under Review</button>
                <button onClick={() => updateStatus(selectedApp.id, 'rejected')} className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700">Reject</button>
                <button onClick={() => setSelectedApp(null)} className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-600">Close</button>
              </div>
            </div>

            <div className="p-6 space-y-5 text-sm">
              {/* Personal Information */}
              <DetailSection title="Personal Information">
                <DetailRow label="Full Name" value={`${selectedApp.firstName} ${selectedApp.middleName || ''} ${selectedApp.lastName}`} />
                <DetailRow label="Date of Birth" value={selectedApp.dateOfBirth} />
                <DetailRow label="SSN" value={selectedApp.socialSecurity} />
                <DetailRow label="Phone" value={selectedApp.phone} />
                <DetailRow label="Email" value={selectedApp.email} />
              </DetailSection>

              {/* Address */}
              <DetailSection title="Address History">
                <DetailRow label="Current Address" value={`${selectedApp.currentAddress}, ${selectedApp.currentCity}, ${selectedApp.currentState} ${selectedApp.currentZip}`} />
                <DetailRow label="Duration" value={selectedApp.currentDuration || '—'} />
                <DetailRow label="3+ Years" value={selectedApp.livedHereThreeYears ? 'Yes' : 'No'} />
                {selectedApp.previousAddresses.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-bold text-gray-600 uppercase mb-1">Previous Addresses:</p>
                    {selectedApp.previousAddresses.map((addr, i) => (
                      <div key={i} className="border-l-2 border-gray-300 pl-3 mb-1 text-gray-700">
                        {addr.address}, {addr.city}, {addr.state} {addr.zip} &mdash; {addr.duration}
                      </div>
                    ))}
                  </div>
                )}
              </DetailSection>

              {/* Driver License */}
              <DetailSection title="Driver's License">
                <DetailRow label="License #" value={selectedApp.licenseNumber} />
                <DetailRow label="State" value={selectedApp.licenseState} />
                <DetailRow label="Expiration" value={selectedApp.licenseExpiration} />
                <DetailRow label="CDL Class" value={selectedApp.cdlClass || 'None'} />
                {selectedApp.endorsements && selectedApp.endorsements.length > 0 && (
                  <DetailRow label="Endorsements" value={selectedApp.endorsements.join(', ')} />
                )}
                {selectedApp.restrictions && selectedApp.restrictions.length > 0 && (
                  <DetailRow label="Restrictions" value={selectedApp.restrictions.join(', ')} />
                )}
                {(selectedApp.licenseImageFront || selectedApp.licenseImageBack) && (
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    {selectedApp.licenseImageFront && (
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase mb-1">Front</p>
                        <a href={selectedApp.licenseImageFront} target="_blank" rel="noopener noreferrer">
                          <img src={selectedApp.licenseImageFront} alt="License Front" className="border border-gray-300 max-h-48 object-contain" />
                        </a>
                      </div>
                    )}
                    {selectedApp.licenseImageBack && (
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase mb-1">Back</p>
                        <a href={selectedApp.licenseImageBack} target="_blank" rel="noopener noreferrer">
                          <img src={selectedApp.licenseImageBack} alt="License Back" className="border border-gray-300 max-h-48 object-contain" />
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
                <DetailRow label="Start Date" value={selectedApp.currentStartDate || '—'} />
                <DetailRow label="Salary" value={selectedApp.currentSalary || '—'} />
                {selectedApp.previousEmployment.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-bold text-gray-600 uppercase mb-1">Previous Employment:</p>
                    {selectedApp.previousEmployment.map((emp, i) => (
                      <div key={i} className="border-l-2 border-gray-300 pl-3 mb-2 text-gray-700">
                        <p className="font-medium">{emp.employer} &mdash; {emp.position}</p>
                        <p className="text-gray-500 text-xs">{emp.startDate} to {emp.endDate} | {emp.salary}</p>
                        {emp.reasonForLeaving && <p className="text-gray-500 text-xs">Reason: {emp.reasonForLeaving}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {selectedApp.militaryService && (
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <DetailRow label="Military" value={`${selectedApp.militaryBranch || '—'}, ${selectedApp.militaryRank || '—'}, ${selectedApp.militaryDates || '—'}`} />
                  </div>
                )}
              </DetailSection>

              {/* Driving History */}
              <DetailSection title="Driving History">
                <DetailRow label="Accidents" value={selectedApp.accidents.length > 0 ? `${selectedApp.accidents.length} reported` : 'None'} />
                {selectedApp.accidents.map((acc, i) => (
                  <div key={i} className="border-l-2 border-red-300 pl-3 mb-1 text-gray-700">
                    {acc.date}: {acc.description} {acc.fatalities ? '— FATALITIES' : ''} {acc.injuries ? '— Injuries' : ''}
                  </div>
                ))}
                <DetailRow label="Violations" value={selectedApp.violations.length > 0 ? `${selectedApp.violations.length} reported` : 'None'} />
                {selectedApp.violations.map((v, i) => (
                  <div key={i} className="border-l-2 border-yellow-300 pl-3 mb-1 text-gray-700">
                    {v.date}: {v.violation} &mdash; {v.location}
                  </div>
                ))}
              </DetailSection>

              {/* Additional Questions */}
              <DetailSection title="Additional Questions">
                <DetailRow label="Convictions" value={selectedApp.hasConvictions ? `Yes — ${selectedApp.convictionsDetails || 'No details'}` : 'No'} />
                <DetailRow label="Can lift 50+ lbs" value={selectedApp.canLiftFiftyLbs ? 'Yes' : 'No'} />
                <DetailRow label="Physical limits" value={selectedApp.hasPhysicalLimits ? `Yes — ${selectedApp.physicalLimitsDetails || ''}` : 'No'} />
                <DetailRow label="Weekends" value={selectedApp.availableWeekends ? 'Yes' : 'No'} />
                <DetailRow label="Overnight" value={selectedApp.availableOvernight ? 'Yes' : 'No'} />
                <DetailRow label="Expected pay" value={selectedApp.expectedPay || '—'} />
                <DetailRow label="How heard" value={selectedApp.howHeardAboutUs || '—'} />
                {selectedApp.referredBy && <DetailRow label="Referred by" value={selectedApp.referredBy} />}
              </DetailSection>

              {/* Emergency Contact */}
              <DetailSection title="Emergency Contact">
                <DetailRow label="Name" value={selectedApp.emergencyContactName || '—'} />
                <DetailRow label="Phone" value={selectedApp.emergencyContactPhone || '—'} />
                <DetailRow label="Relationship" value={selectedApp.emergencyContactRelation || '—'} />
              </DetailSection>

              {/* Signature */}
              <DetailSection title="Certification & Signature">
                <DetailRow label="Signature" value={selectedApp.signature || 'Not signed'} />
                <DetailRow label="Date" value={selectedApp.signatureDate || '—'} />
              </DetailSection>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-gray-300 p-4">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 uppercase font-medium">{label}</p>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-300 overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{title}</span>
      </div>
      <div className="p-4 space-y-1">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-36 shrink-0 text-xs uppercase font-medium">{label}:</span>
      <span className="text-gray-900 text-sm">{value || '—'}</span>
    </div>
  );
}
