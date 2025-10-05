// components/ProgramConfiguration.tsx
'use client';

import { useState } from 'react';

interface ProgramConfig {
  rewardType: string;
  rewardAmount: number;
  rewardCurrency: string;
  eligibility: string;
  minPurchase: number;
  expirationDays: number;
  rewardBoth: boolean;
  maxReferrals: number;
  chainRewards: boolean;
}

interface ProgramConfigurationProps {
  config: ProgramConfig;
  onUpdate: (config: Partial<ProgramConfig>) => void;
}

export default function ProgramConfiguration({ config, onUpdate }: ProgramConfigurationProps) {
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    onUpdate(localConfig);
    alert('Program configuration saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg text-black shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">⚙️ Program Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reward Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward Type</label>
          <select 
            value={localConfig.rewardType}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, rewardType: e.target.value }))}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg"
          >
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
            Reward Amount ({localConfig.rewardCurrency})
          </label>
          <input
            type="number"
            value={localConfig.rewardAmount}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, rewardAmount: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Eligibility Rules */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Rules</label>
          <select 
            value={localConfig.eligibility}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, eligibility: e.target.value }))}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg"
          >
            <option value="first_purchase">First Purchase Only</option>
            <option value="any_purchase">Any Purchase</option>
            <option value="min_purchase">Minimum Purchase Required</option>
          </select>
        </div>

        {/* Minimum Purchase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Purchase ({localConfig.rewardCurrency})
          </label>
          <input
            type="number"
            value={localConfig.minPurchase}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, minPurchase: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Expiration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiration (Days)</label>
          <input
            type="number"
            value={localConfig.expirationDays}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, expirationDays: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Max Referrals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Referrals Per User</label>
          <input
            type="number"
            value={localConfig.maxReferrals}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, maxReferrals: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mt-6 space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={localConfig.rewardBoth}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, rewardBoth: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Reward both referrer and referee</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={localConfig.chainRewards}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, chainRewards: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Enable referral chain rewards</span>
        </label>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Save Program Configuration
        </button>
      </div>
    </div>
  );
}