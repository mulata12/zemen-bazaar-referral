'use client';

import { useState } from 'react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface ReferralCardProps {
  code: string;
  referrals: number;
  balance: number;
  pending: number;
  maxReferrals: number;
}

export default function ReferralCard({
  code,
  referrals,
  balance,
  pending,
  maxReferrals,
}: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [, copy] = useCopyToClipboard();

  const remainingReferrals = Math.max(0, maxReferrals - referrals);
  const isReferralLimitReached = remainingReferrals <= 0;

  const maskReferralCode = (code: string) => {
    if (showCode) return code;

    const visiblePart = code.substring(0, 5);
    const maskedPart = '*'.repeat(Math.max(0, code.length - 5));

    return visiblePart + maskedPart;
  };

  const displayedCode = maskReferralCode(code);

  const toggleCodeVisibility = () => setShowCode(!showCode);

  const handleCopyCode = () => {
    if (isReferralLimitReached) {
      alert(
        `You have reached the maximum number of referrals (${maxReferrals}).`
      );
      return;
    }

    copy(code);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    if (isReferralLimitReached) {
      alert(
        `You have reached the maximum number of referrals (${maxReferrals}).`
      );
      return;
    }

    const shareUrl = `${window.location.origin}/user/login?rCode=${code}`;

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

  const getRemainingColor = () => {
    const ratio = remainingReferrals / maxReferrals;

    if (ratio > 0.6) return 'text-green-600 bg-green-100';
    if (ratio > 0.3) return 'text-yellow-600 bg-yellow-100';

    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Your referral code
      </h2>

      {/* Referrals Remaining */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              Referrals remaining:
            </span>

            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${getRemainingColor()}`}
            >
              {remainingReferrals} / {maxReferrals}
            </span>
          </div>

          {/* Dynamic circles */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            {Array.from({ length: maxReferrals }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < referrals ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {isReferralLimitReached && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            You've reached the maximum referral limit. No more referrals can be
            made.
          </div>
        )}
      </div>

      {/* Code section */}
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-6">
        <span className="font-mono text-lg text-blue-800">
          {displayedCode}
        </span>

        <div className="flex space-x-2">
          <button
            onClick={toggleCodeVisibility}
            className={`p-2 rounded-md focus:outline-none transition-colors ${
              isReferralLimitReached
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }`}
            disabled={isReferralLimitReached}
          >
            {showCode ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>

          <button
            onClick={handleCopyCode}
            disabled={isReferralLimitReached}
            className={`px-4 py-2 rounded-md transition-colors ${
              isReferralLimitReached
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? 'Copied✅' : 'Copy Code'}
          </button>

          <button
            onClick={handleShareLink}
            disabled={isReferralLimitReached}
            className={`px-4 py-2 rounded-md transition-colors ${
              isReferralLimitReached
                ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Share Link
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-700">{referrals}</p>
          <p className="text-sm text-gray-600">Referrals</p>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-700">
            {balance} Birr
          </p>
          <p className="text-sm text-gray-600">Balance</p>
        </div>

        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <p className="text-2xl font-bold text-yellow-700">{pending}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>
    </div>
  );
}
