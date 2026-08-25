"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  totalUsers: number;
  totalReferrals: number;
  successful?: number;
  pending?: number;
  fraud?: number;
  totalRewards: number;
  monthlyTrend?: number[];
}

export default function AnalyticsOverview() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:4000";

        const res = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const data = await res.json();

        setAnalytics({
          totalUsers: data.totalUsers,
          totalReferrals: data.totalReferrals,
          successful: data.successful ?? 0,
          pending: data.pending ?? 0,
          fraud: data.fraud ?? 0,
          totalRewards: data.totalRewards,
          monthlyTrend: data.monthlyTrend ?? [],
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg shadow-lg p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const monthlyMax = Math.max(
    ...(analytics.monthlyTrend || [0])
  );

  return (
    <div className="bg-white rounded-lg text-black shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">
        📊 Analytics Overview
      </h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {analytics.totalUsers}
          </div>

          <div className="text-sm text-gray-600">
            Total Users
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {analytics.totalReferrals}
          </div>

          <div className="text-sm text-gray-600">
            Total Referrals
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {analytics.fraud}
          </div>

          <div className="text-sm text-gray-600">
            Fraud Cases
          </div>
        </div>

      </div>

      {/* Monthly Trend */}
      <div>
        <h4 className="font-medium mb-4">
          Monthly Referral Trend
        </h4>

        <div className="flex items-end space-x-1 h-32">
          {(analytics.monthlyTrend || []).map(
            (value, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{
                    height: `${
                      (value / (monthlyMax || 1)) * 80
                    }%`,
                  }}
                ></div>

                <span className="text-xs text-gray-500 mt-1">
                  {index + 1}
                </span>
              </div>
            )
          )}
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Sep</span>
          <span>Oct</span>
        </div>
      </div>

      {/* Rewards Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalRewards} Birr
          </div>

          <div className="text-sm text-gray-600">
            Total Rewards Distributed
          </div>
        </div>
      </div>
    </div>
  );
}
