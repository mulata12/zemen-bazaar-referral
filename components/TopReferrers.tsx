'use client';

import { useEffect, useState } from 'react';

interface TopReferrer {
  id: number;
  fullname: string;
  totalreferrals: string; 
}
export default function TopReferrers() {
  const [referrers, setReferrers] = useState<TopReferrer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTopReferrers() {
      setLoading(true);
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/admin/top-referrals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch top referrers");
        const data: TopReferrer[] = await res.json();
        setReferrers(data || []);
      } catch (error) {
        console.error("Failed to fetch top referrers:", error);
        setReferrers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTopReferrers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
        Loading top referrers...
      </div>
    );
  }
  if (referrers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
        🏆 No referral data available yet
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-15">
      <h3 className="text-lg text-black font-semibold mb-4">🏆 Top Referrers</h3>
      <div className="space-y-3">
        {referrers.map((referrer, index) => (
          <div
            key={referrer.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0
                    ? "bg-blue-700"
                    : index === 1
                    ? "bg-blue-700"
                    : index === 2
                    ? "bg-blue-700"
                    : "bg-blue-700"
                }`}
              >
                {index + 1}
              </div>
              <div>
                <div className="font-medium">{referrer.fullname || "Unnamed"}</div>
                <div className="text-sm text-gray-600">
                  {referrer.totalreferrals} referrals
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
