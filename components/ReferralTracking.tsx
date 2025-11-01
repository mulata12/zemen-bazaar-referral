'use client';
import { useState, useEffect } from "react";
interface Referral {
  id: string;
  referrer: { 
    id: string; 
    name: string; 
    status: string; 
    balance: number;
  };
  referee: { 
    id: string; 
    name: string; 
  };
  createdAt: string;
}
interface ReferralTrackingProps {
  referrals: Referral[];  
}
export default function ReferralTracking({}: ReferralTrackingProps) {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('adminToken');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/admin/referrals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch referrals');
        }
        const data = await res.json();
        setReferrals(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error fetching referrals');
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);
  const filteredReferrals = referrals.filter(ref =>
      (ref.referrer?.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ref.referee?.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <h3 className="text-xl font-semibold text mb-4">🔍 Referral Tracking</h3>
      {/* Search input centered */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search referrals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg w-64"
        />
      </div>
      {/* Loading/Error */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading referrals...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{referral.referrer.name}</div>
                      <div className="text-sm text-gray-500">{referral.referrer.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{referral.referee.name}</div>
                      <div className="text-sm text-gray-500">{referral.referee.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(referral.referrer.status)}`}>
                      {referral.referrer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-black">{referral.referrer.balance} Birr</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(referral.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredReferrals.length === 0 && (
            <div className="text-center py-4 text-gray-500">No referrals found.</div>
          )}
        </div>
      )}
    </div>
  );
}
