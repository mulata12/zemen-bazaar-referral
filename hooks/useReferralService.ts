// hooks/useReferralService.ts
'use client';
export function useReferralService() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const getReferralInfo = async (code: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/referral/validate/${code}`);
      if (!response.ok) return { isValid: false };
      return await response.json();
    } catch (error) {
      console.error('Error validating referral code:', error);
      return { isValid: false };
    }
  };
  return { getReferralInfo };
}










