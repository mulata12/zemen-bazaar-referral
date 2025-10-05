// services/referralService.ts
export interface ReferralInfo {
  isValid: boolean;
  referrerId?: string;
  referrerName?: string;
  expiresAt?: string;
  maxUses?: number;
  currentUses?: number;
  rewardDetails?: string;
}

// For server-side use (no environment variable prefix needed)
export async function getReferralInfoServer(code: string): Promise<ReferralInfo> {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/referral/validate/${code}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) return { isValid: false };
    return await response.json();
  } catch (error) {
    console.error('Error validating referral code:', error);
    return { isValid: false };
  }
}

