'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReferralCard from '@/components/ReferralCard';
import HowItWorks from '@/components/HowItWorks';
import ReferralTable from '@/components/ReferralTable';

// Mock data
const mockReferralData = {
  code: 'ZEMEN-USER-A7X58R',
  referrals: 1,
  earned: 100,
  pending: 4,
  referralsList: [
    { id: 1, name: 'Abebe', role: 'User', status: 'Completed', reward: '100 Birr' },
    { id: 2, name: 'Sara', role: 'user', status: 'Pending', reward: '100 Birr' },
    { id: 3, name: 'John', role: 'user', status: 'Pending', reward: '50 Birr' },
  ]
};

function generateReferralCode() {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ZEMEN-USER-${randomPart}`;
}

export default function UserDashboardPage() {
  const [referralData, setReferralData] = useState(mockReferralData);
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Clear any user data and redirect to homepage
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReferralData({
          ...mockReferralData,
          code: generateReferralCode()
        });
      } catch (error) {
        console.error('Failed to fetch referral data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
  
  return (
    <div className="min-h-screen bg-gray-50 pt-4 relative">
      {/* Back to Homepage Button - Top Left */}
      <button 
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-10 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Homepage
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with History Button */}
        <div className="flex justify-between items-center mb-8 pt-12"> {/* Added pt-12 to account for the back button */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Referral Program</h1>
            <p className="text-lg text-gray-600 mt-2">
              Invite friends and earn rewards.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            {/* Logout Button - Above Show History */}
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
            
            {/* Show History Button - FIXED: Added text content */}
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

        {showHistory && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Referral History</h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReferralCard 
              code={referralData.code}
              referrals={referralData.referrals}
              earned={referralData.earned}
              pending={referralData.pending}
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