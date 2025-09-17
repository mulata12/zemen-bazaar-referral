// API service functions for interacting with the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.zemenbazaar.com';

export async function getReferralData(token: string) {
  const response = await fetch(`${API_BASE_URL}/referral`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch referral data');
  }

  return response.json();
}

export async function generateReferralCode(token: string) {
  const response = await fetch(`${API_BASE_URL}/referral/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to generate referral code');
  }

  return response.json();
}

export async function getReferralStats(token: string) {
  const response = await fetch(`${API_BASE_URL}/referral/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch referral stats');
  }

  return response.json();
}