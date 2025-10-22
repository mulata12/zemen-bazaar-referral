// components/FraudMonitoring.tsx
'use client';

interface FraudCase {
  id: string;
  user: { id: string; name: string; email: string };
  reason: string;
  severity: string;
  status: string;
  date: string;
}

interface FraudMonitoringProps {
  fraudCases: FraudCase[];
}

export default function FraudMonitoring({ fraudCases }: FraudMonitoringProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case 'multiple_accounts': return 'Multiple Accounts';
      case 'self_referral': return 'Self Referral';
      case 'fake_email': return 'Fake Email';
      case 'suspicious_activity': return 'Suspicious Activity';
      default: return reason;
    }
  };

  return (
    <div className="bg-white rounded-lg text-black shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">🛡️ Fraud Monitoring</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fraudCases.map((case_) => (
              <tr key={case_.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{case_.user.name}</div>
                    <div className="text-sm text-gray-500">{case_.user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">{getReasonText(case_.reason)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(case_.severity)}`}>
                    {case_.severity}
                  </span>
                </td>
                <td className="px-6 py-4">{case_.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{case_.date}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Review</button>
                    <button className="text-red-600 hover:text-red-900 text-sm">Ban</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


