// app/dashboard/user/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ReferralCard from '@/components/ReferralCard';
import HowItWorks from '@/components/HowItWorks';
import ReferralTable from '@/components/ReferralTable';

// Mock data
const mockReferralData = {
  code: 'ZEMEN-USER-A7X58R',
  referrals: 1,
  earned: 100,
  pending: 2,
  referralsList: [
    { id: 1, name: 'Abebe', role: 'User', status: 'Completed', reward: '100 Birr' },
    { id: 2, name: 'Sara', role: 'Seller', status: 'Pending', reward: '200 Birr' },
    { id: 3, name: 'John', role: 'Delivery Agent', status: 'Pending', reward: '50 Birr' },
  ]
};

// helper to generate random referral codes
function generateReferralCode(role: string) {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ZEMEN-${role.toUpperCase()}-${randomPart}`;
}

export default function UserDashboardPage() {
  const [referralData, setReferralData] = useState(mockReferralData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<'User' | 'Seller' | 'Agent'>('User');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReferralData(mockReferralData);
      } catch (error) {
        console.error('Failed to fetch referral data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRoleClick = (role: 'User' | 'Seller' | 'Agent') => {
    setActiveRole(role);
    setReferralData((prev) => ({
      ...prev,
      code: generateReferralCode(role),
    }));
  };

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Delivery Agent Referral Program</h1>
          <p className="text-lg text-gray-600 mt-2">
            Invite friends, sellers, or delivery agents and earn rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReferralCard 
              code={referralData.code}
              referrals={referralData.referrals}
              earned={referralData.earned}
              pending={referralData.pending}
            />
            
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Referrals</h2>
              <ReferralTable referrals={referralData.referralsList} />

              {/* Role Buttons */}
              <div className="mt-6 flex justify-between items-center">
                <button 
                  onClick={() => handleRoleClick('User')}
                  className={`px-4 py-2 rounded-lg transition ${
                    activeRole === 'User' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Users
                </button>
                <button 
                  onClick={() => handleRoleClick('Seller')}
                  className={`px-4 py-2 rounded-lg transition ${
                    activeRole === 'Seller' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sellers
                </button>
                <button 
                  onClick={() => handleRoleClick('Agent')}
                  className={`px-4 py-2 rounded-lg transition ${
                    activeRole === 'Agent' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Delivery Agent
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <HowItWorks />
          </div>
        </div>
      </div>
    </div>
  );
}


