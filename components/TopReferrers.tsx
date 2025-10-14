// components/TopReferrers.tsx
'use client';

interface TopReferrer {
  id: string;
  name: string;
  referrals: number;
  totalRewards: number;
}

interface TopReferrersProps {
  referrers: TopReferrer[];
}

export default function TopReferrers({ referrers }: TopReferrersProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-9">
      <h3 className="text-lg  text-black font-semibold mb-4">🏆 Top Referrers</h3>
      
      <div className="space-y-3">
        {referrers.map((referrer, index) => (
          <div key={referrer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-blue-500' : 
                index === 1 ? 'bg-blue-500' : 
                index === 2 ? 'bg-blue-500' : 'bg-blue-500'
              }`}>
                {index + 1}
              </div>
              <div>
                <div className="font-medium">{referrer.name}</div>
                <div className="text-sm text-gray-600">{referrer.referrals} referrals</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">{referrer.totalRewards} Birr</div>
              <div className="text-xs text-gray-500">earned</div>
            </div>
          </div>
        ))}
      </div>

      {referrers.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No referral data available yet
        </div>
      )}
    </div>
  );
}



