// app/r/[code]/page.tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ code: string }>;
}

interface TrackingMetadata {
  ip: string;
  userAgent: string;
  timestamp: string;
}

export default async function ReferralRedirectPage({ params }: PageProps) {
  const { code } = await params;
  
  // Basic validation
  if (!code || !isValidReferralCode(code)) {
    redirect('/signup?error=invalid_referral');
  }

  // Track referral click (server-side only)
  const headersList = await headers(); // Await the headers promise
  await trackReferralClick(code, {
    ip: headersList.get('x-forwarded-for') || 'unknown',
    userAgent: headersList.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString(),
  });

  redirect(`/signup?ref=${encodeURIComponent(code)}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Join Zemen Bazaar with ${code}'s Referral`,
    description: 'Sign up using a referral code for special rewards',
    metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  };
}

function isValidReferralCode(code: string): boolean {
  return /^[A-Z0-9_-]{3,20}$/i.test(code);
}

async function trackReferralClick(code: string, metadata: TrackingMetadata) {
  try {
    // This runs on the server, so we can use environment variables without NEXT_PUBLIC_
    const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
    
    // For development, just log to console instead of making actual API calls
    if (process.env.NODE_ENV === 'development') {
      console.log('Referral click tracked:', { code, ...metadata });
      return;
    }
    
    await fetch(`${API_BASE_URL}/api/referral/track-click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, ...metadata }),
    });
  } catch (error) {
    console.error('Tracking failed:', error);
    // Don't throw error - tracking shouldn't break the redirect
  }
}