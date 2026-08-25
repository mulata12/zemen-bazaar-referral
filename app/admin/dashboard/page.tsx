'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProgramConfiguration from "@/components/ProgramConfiguration";
import ReferralTracking from "@/components/ReferralTracking";
import FraudMonitoring from "@/components/FraudMonitoring";
import AnalyticsOverview from "@/components/AnalyticsOverview";
import TopReferrers from "@/components/TopReferrers";

export default function AdminDashboardPage() {
  const [adminData, setAdminData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'config' | 'tracking' | 'fraud' | 'analytics'>('config');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);

      try {
        const storedEmail = localStorage.getItem("adminEmail");
        const storedRole = localStorage.getItem("adminRole");
        const token = localStorage.getItem("adminToken");

        if (
          !storedEmail ||
          !storedRole ||
          !token ||
          storedRole.toUpperCase() !== "ADMIN"
        ) {
          router.push("/admin/login");
          return;
        }

        setRole(storedRole.toUpperCase());

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch admin dashboard data");
        }

        const data = await res.json();
        setAdminData(data);
      } catch (err) {
        console.error("Admin dashboard error:", err);
        setAdminData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminToken");

    router.push("/admin/login");
  };

  const updateProgramConfig = (newConfig: any) => {
    setAdminData((prev: any) => ({
      ...prev,
      programConfig: {
        ...prev?.programConfig,
        ...newConfig,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!role || role.toUpperCase() !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">
          Access denied — Admins only.
        </p>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">
          No data available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              Back to Home
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          Referral Program Management
        </h1>

        <p className="text-gray-600 mb-8">
          Configure and monitor referrals, rewards, and fraud prevention
        </p>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: "config", label: "⚙️ Program Config" },
            { id: "tracking", label: "🔍 Referral Tracking" },
            { id: "fraud", label: "🛡️ Fraud Monitoring" },
            { id: "analytics", label: "📊 Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {activeTab === "config" && (
              <ProgramConfiguration
                config={adminData.programConfig || {}}
                onUpdate={updateProgramConfig}
              />
            )}

            {activeTab === "tracking" && (
              <ReferralTracking
                referrals={adminData.referral || []}
              />
            )}

            {activeTab === "fraud" && (
              <FraudMonitoring
                fraudCases={adminData.fraudCases || []}
              />
            )}

            {activeTab === "analytics" && (
              <AnalyticsOverview
                analytics={adminData.analytics || {}}
              />
            )}
          </div>

          <div className="space-y-6">
            <TopReferrers />
          </div>
        </div>
      </div>
    </div>
  );
}
