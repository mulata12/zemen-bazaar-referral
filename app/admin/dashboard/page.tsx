

'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import ProgramConfiguration from '@/components/ProgramConfiguration';
import ReferralTracking from '@/components/ReferralTracking';
import FraudMonitoring from '@/components/FraudMonitoring';
import AnalyticsOverview from '@/components/AnalyticsOverview';
import TopReferrers from '@/components/TopReferrers';

// Mock data matching my component interfaces
const mockAdminData = {
  programConfig: {
    rewardType: 'discount',
    rewardAmount: 10,
    rewardCurrency: 'Birr',
    eligibility: 'min_purchase',
    minPurchase: 100,
    expirationDays: 90,
    rewardreferrer: true,
    rewardBoth: true,
    maxReferrals: 5,
    chainRewards: false
  },
  referrals: [
    {
      id: 'R001',
      referrer: { id: 'U001', name: 'Abebe', email: 'abebe@gmail.com' },
      referee: { id: 'U002', name: 'Sara', email: 'sara@gmail.com' },
      role: 'user',
      status: 'completed',
      reward: 100,
      date: '2024-01-15',
      orderValue: 2500
    },
    {
      id: 'R002',
      referrer: { id: 'U001', name: 'Abebe', email: 'abebe@gmail.com' },
      referee: { id: 'U003', name: 'John', email: 'john@gmail.com' },
      role: 'user',
      status: 'pending',
      reward: 50,
      date: '2024-01-14',
      orderValue: 0
    },
    {
      id: 'R003',
      referrer: { id: 'U004', name: 'Alice', email: 'alice@gmail.com' },
      referee: { id: 'U005', name: 'Bob', email: 'bob@gmail.com' },
      role: 'User',
      status: 'completed',
      reward: 100,
      date: '2024-01-13',
      orderValue: 1500
    }
  ],
  fraudCases: [
    {
      id: 'F001',
      user: { id: 'U005', name: 'Mike', email: 'mike@gmail.com' },
      reason: 'multiple_accounts',
      severity: 'high',
      status: 'under_review',
      date: '2024-01-15'
    },
    {
      id: 'F002',
      user: { id: 'U006', name: 'Eva', email: 'eva@gmail.com' },
      reason: 'self_referral',
      severity: 'medium',
      status: 'confirmed',
      date: '2024-01-14'
    }
  ],
  topReferrers: [
    { id: 'U001', name: 'Abebe', referrals: 50, totalRewards: 5000 },
    { id: 'U004', name: 'Alice', referrals: 45, totalRewards: 4500 },
    { id: 'U007', name: 'John', referrals: 40, totalRewards: 4000 },
    { id: 'U008', name: 'Sarah', referrals: 35, totalRewards: 3500 },
    { id: 'U009', name: 'David', referrals: 30, totalRewards: 3000 }
  ],
  analytics: {
    totalReferrals: 89,
    successful: 67,
    pending: 18,
    fraud: 4,
    totalRewards: 8900,
    monthlyTrend: [12, 15, 18, 22, 25, 30, 28, 32, 35, 38, 40, 42]
  }
};

export default function AdminDashboardPage() {
  const [adminData, setAdminData] = useState(mockAdminData);
  const [activeTab, setActiveTab] = useState<'config' | 'tracking' | 'fraud' | 'analytics'>('config');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    // Simple loading simulation - NO AUTHENTICATION CHECK 
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAdminData(mockAdminData);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    // Simply redirect to home - no auth cleanup needed
    router.push('/admin/login');
  };

  const updateProgramConfig = (newConfig: any) => {
    setAdminData(prev => ({
      ...prev,
      programConfig: { ...prev.programConfig, ...newConfig }
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
              
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Referral Program Management</h1>
          <p className="text-lg text-gray-600 mt-2">
            Configure and monitor referrals, rewards, and fraud prevention
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'config', label: '⚙️ Program Config', icon: '⚙️' },
              { id: 'tracking', label: '🔍 Referral Tracking', icon: '🔍' },
              { id: 'fraud', label: '🛡️ Fraud Monitoring', icon: '🛡️' },
              { id: 'analytics', label: '📊 Analytics', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Program Configuration */}
            {activeTab === 'config' && (
              <ProgramConfiguration 
                config={adminData.programConfig} 
                onUpdate={updateProgramConfig} 
              />
            )}

            {/* Referral Tracking */}
            {activeTab === 'tracking' && (
              <ReferralTracking referrals={adminData.referrals} />
            )}

            {/* Fraud Monitoring */}
            {activeTab === 'fraud' && (
              <FraudMonitoring fraudCases={adminData.fraudCases} />
            )}

            {/* Analytics Overview */}
            {activeTab === 'analytics' && (
              <AnalyticsOverview analytics={adminData.analytics} />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Top Referrers */}
            <TopReferrers referrers={adminData.topReferrers} />
            
            {/* Quick Stats */}
            

            {/* System Status */}
            
          </div>
        </div>
      </div>
    </div>
  );
}



