// components/AnalyticsOverview.tsx
//C:\Users\hp\zemen-referral\components\AnalyticsOverview.tsx
'use client';

interface AnalyticsData {
  totalReferrals: number;
  successful: number;
  pending: number;
  fraud: number;
  totalRewards: number;
  monthlyTrend: number[];
}

interface AnalyticsOverviewProps {
  analytics: AnalyticsData;
}

export default function AnalyticsOverview({ analytics }: AnalyticsOverviewProps) {
  const successRate = ((analytics.successful / analytics.totalReferrals) * 100).toFixed(1);
  
  return (
    <div className="bg-white rounded-lg text-black shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">📊 Analytics Overview</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{analytics.totalReferrals}</div>
          <div className="text-sm text-gray-600">Total Referrals</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{analytics.successful}</div>
          <div className="text-sm text-gray-600">Successful</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{analytics.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{analytics.fraud}</div>
          <div className="text-sm text-gray-600">Fraud Cases</div>
        </div>
      </div>

      {/* Success Rate */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Success Rate</span>
          <span className="font-bold text-green-600">{successRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${successRate}%` }}
          ></div>
        </div>
      </div>

      {/* Monthly Trend (Simple bar chart) */}
      <div>
        <h4 className="font-medium mb-4">Monthly Referral Trend</h4>
        <div className="flex items-end space-x-1 h-32">
          {analytics.monthlyTrend.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${(value / Math.max(...analytics.monthlyTrend)) * 80}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Jan</span>
          <span>Dec</span>
        </div>
      </div>

      {/* Rewards Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{analytics.totalRewards} Birr</div>
          <div className="text-sm text-gray-600">Total Rewards Distributed</div>
        </div>
      </div>
    </div>
  );
}