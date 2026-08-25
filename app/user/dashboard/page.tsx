'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReferralCard from '@/components/ReferralCard';
import HowItWorks from '@/components/HowItWorks';
import ReferralTable from '@/components/ReferralTable';

interface ReferralItem {
  id: number;
  name: string;
  phone: string;
  role: string;
  status: string;
  reward: string;
}

interface ReferralData {
  code: string;
  referrals: number;
  balance: number;
  pending: number;
  referralsList: ReferralItem[];
  maxReferrals: number;
}

export default function UserDashboardPage() {
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    router.push('/');
  };

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setIsLoading(true);

        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('User not logged in');
        }

        // Use the deployed backend in production.
        // NEXT_PUBLIC_API_URL should be set in Vercel.
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          'https://zb-referral-backend.vercel.app';

        const [dashboardRes, historyRes] = await Promise.all([
          fetch(`${apiUrl}/referrals/dashboard/${userId}`),
          fetch(`${apiUrl}/referrals/history/${userId}`),
        ]);

        if (!dashboardRes.ok || !historyRes.ok) {
          throw new Error('Failed to fetch referral data');
        }

        const dashboardJson = await dashboardRes.json();
        const historyJson = await historyRes.json();

        console.log('📊 Dashboard:', dashboardJson);
        console.log('📜 History:', historyJson);

        const historyNormalized = (historyJson || []).map(
          (item: any, index: number) => ({
            id: index + 1,
            name: item['Referee'] || 'Unknown',
            phone: item['Phone Number'] || '-',
            role: item['Role'] || '-',
            status: item['Status'] || 'Pending',
            reward: `${item['Reward'] ?? 0} Birr`,
          })
        );

        const mappedData: ReferralData = {
          code: dashboardJson.referralCode || '',
          referrals: dashboardJson.referralsCount || 0,
          balance: dashboardJson.balance || 0,
          pending: dashboardJson.pending || 0,
          referralsList: historyNormalized,
          maxReferrals: dashboardJson.maxReferrals || 5,
        };

        setReferralData(mappedData);
      } catch (error) {
        console.error('Error fetching referral data:', error);
        setReferralData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading referral data...</p>
        </div>
      </div>
    );
  }

  if (!referralData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Failed to load referral data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-4 relative">
      {/* Back to homepage button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-10 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Homepage
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Referral Program
            </h1>

            <p className="text-lg text-gray-600 mt-2">
              Invite friends and earn rewards.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              Logout
            </button>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-6 py-3 rounded-lg transition font-medium ${
                showHistory
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-green-100 text-gray-700 hover:bg-green-200'
              }`}
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
        </div>

        {/* Referral History */}
        {showHistory && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                My Referrals
              </h2>

              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700 font-bold"
              >
                Close
              </button>
            </div>

            <ReferralTable referrals={referralData.referralsList} />
          </div>
        )}

        {/* Referral Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ReferralCard
              code={referralData.code}
              referrals={referralData.referrals}
              balance={referralData.balance}
              pending={referralData.pending}
              maxReferrals={referralData.maxReferrals}
            />
          </div>

          <div>
            <HowItWorks />
          </div>
        </div>
      </div>
    </div>
  );
}
