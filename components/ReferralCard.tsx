'use client';

import { useState } from 'react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface ReferralCardProps {
  code: string;
  referrals: number;
  earned: number;
  pending: number;
}

export default function ReferralCard({ code, referrals, earned, pending }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const handleCopyCode = () => {
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/signup?ref=${code}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join Zemen Bazaar',
        text: 'Sign up for Zemen Bazaar using my referral code and get a reward or discount!',
        url: shareUrl,
      });
    } else {
      copy(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your referral code</h2>
      
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-6">
        <span className="font-mono text-lg text-blue-800">{code}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {copied ? 'Copied✅' : 'Copy Code'}
          </button>
          <button
            onClick={handleShareLink}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Share Link
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-700">{referrals}</p>
          <p className="text-sm text-gray-600">Referrals</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-700">{earned} Birr</p>
          <p className="text-sm text-gray-600">Rewards Earned</p>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <p className="text-2xl font-bold text-yellow-700">{pending}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>
    </div>
  );
}


