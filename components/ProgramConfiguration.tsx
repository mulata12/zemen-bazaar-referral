'use client';

import { useState, useEffect } from 'react';

interface ProgramConfig {
  rewardType?: string;
  rewardAmount?: number | string;
  rewardCurrency?: string;
  eligibility?: string;
  minPurchase?: number | string;
  expirationDays?: number | string;
  rewardReferrer?: boolean;
  maxReferrals?: number | string;
  chainRewards?: boolean;
}

interface ProgramConfigurationProps {
  config: ProgramConfig;
  onUpdate: (config: Partial<ProgramConfig>) => void;
}

export default function ProgramConfiguration({ config, onUpdate }: ProgramConfigurationProps) {
  const [localConfig, setLocalConfig] = useState<ProgramConfig>({
    rewardType: 'wallet',
    rewardAmount: '',
    rewardCurrency: 'ETB',
    eligibility: 'first_purchase',
    minPurchase: '',
    expirationDays: '',
    rewardReferrer: false,
    maxReferrals: '',
    chainRewards: false,
    ...config,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalConfig(prev => ({ ...prev, ...config }));
  }, [config]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

      // Convert empty strings to numbers for backend
      const payload = {
        ...localConfig,
        rewardAmount: localConfig.rewardAmount === '' ? 0 : Number(localConfig.rewardAmount),
        minPurchase: localConfig.minPurchase === '' ? 0 : Number(localConfig.minPurchase),
        expirationDays: localConfig.expirationDays === '' ? 0 : Number(localConfig.expirationDays),
        maxReferrals: localConfig.maxReferrals === '' ? 0 : Number(localConfig.maxReferrals),
      };

      const res = await fetch(`${apiUrl}/admin/reward-settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to save configuration');
      }

      const updatedConfig = await res.json();
      onUpdate(updatedConfig);
      alert('Program configuration saved successfully!');
    } catch (err: any) {
      console.error('Error saving program configuration:', err);
      alert('Error saving configuration: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg text-black shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">⚙️ Program Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reward Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward Type</label>
          <select
            value={localConfig.rewardType ?? ''}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, rewardType: e.target.value }))}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg"
          >
            <option value="">Select Reward Type</option>
            <option value="wallet">Wallet Credit</option>
            <option value="discount">Percentage Discount</option>
            <option value="fixed">Fixed Amount Discount</option>
            <option value="free_delivery">Free Delivery</option>
            <option value="points">Loyalty Points</option>
          </select>
        </div>

        {/* Reward Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reward Amount ({localConfig.rewardCurrency ?? 'ETB'})
          </label>
          <input
            type="string"
            value={localConfig.rewardAmount ?? ''}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, rewardAmount: e.target.value }))}
            placeholder="Enter reward amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Eligibility Rules */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Rules</label>
          <select
            value={localConfig.eligibility ?? ''}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, eligibility: e.target.value }))}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg"
          >
            <option value="">Select Eligibility</option>
            <option value="first_purchase">No purchase needed</option>
            <option value="first_purchase">First Purchase Only</option>
            <option value="any_purchase">Any Purchase</option>
            <option value="min_purchase">Minimum Purchase Required</option>
          </select>
        </div>
        {/* Minimum Purchase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Purchase ({localConfig.rewardCurrency ?? 'ETB'})
          </label>
          <input
            type="number"
            value={localConfig.minPurchase ?? ''}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, minPurchase: e.target.value }))}
            placeholder="Enter minimum purchase"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Expiration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiration (Days)</label>
          <input
            type="number"
            value={localConfig.expirationDays ?? ''}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, expirationDays: e.target.value }))}
            placeholder="Enter expiration days"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Max Referrals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Referrals Per User</label>
          <input
            type="number"
            value={localConfig.maxReferrals ?? ''}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, maxReferrals: e.target.value }))}
            placeholder="Enter max referrals"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      {/* Checkboxes */}
      <div className="mt-6 space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={localConfig.rewardReferrer ?? false}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, rewardReferrer: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Reward Referrer</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={localConfig.chainRewards ?? false}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, chainRewards: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Enable Referral Chain Rewards</span>
        </label>
      </div>
      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Saving...' : 'Save Program Configuration'}
        </button>
      </div>
    </div>
  );
}
