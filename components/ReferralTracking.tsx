// components/ReferralTracking.tsx
'use client';
import { useState } from "react";
interface Referral {
  id: string;
  referrer: { id: string; name: string; email: string };
  referee: { id: string; name: string; email: string };
  role: string;
  status: string;
  reward: number;
  date: string;
  orderValue: number;
}

interface ReferralTrackingProps {
  referrals: Referral[];
}

export default function ReferralTracking({ referrals }: ReferralTrackingProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReferrals = referrals.filter(ref =>
    ref.referrer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.referee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'fraud': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center text-black mb-6">
        <h3 className="text-xl font-semibold">🔍 Referral Tracking</h3>
        <input
          type="text"
          placeholder="Search referrals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reward</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReferrals.map((referral) => (
              <tr key={referral.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{referral.referrer.name}</div>
                    <div className="text-sm text-gray-500">{referral.referrer.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{referral.referee.name}</div>
                    <div className="text-sm text-gray-500">{referral.referee.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-black">{referral.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(referral.status)}`}>
                    {referral.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-black">{referral.reward} Birr</td>
                <td className="px-6 py-4 text-sm text-gray-500">{referral.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

