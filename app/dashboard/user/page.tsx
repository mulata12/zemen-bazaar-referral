'use client'

import ReferralCard from '@/components/ReferralCard'
import ReferralTable from '@/components/ReferralTable'
import HowItWorks from '@/components/HowItWorks'
import { useDashboard, useGenerateCode } from '@/hooks/useReferrals'

export default function UserDashboard() {
  const { data, isLoading } = useDashboard()
  const gen = useGenerateCode()

  if (isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <ReferralCard
            code={data?.code}
            stats={data?.stats}
            onGenerate={() => gen.mutate({ role: 'user' })}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Referrals</h3>
              <ReferralTable items={data?.referrals ?? []} />
            </div>
            <HowItWorks />
          </div>

          <p className="text-sm text-gray-600">{data?.rewardNote}</p>
        </div>
      </div>
    </div>
  )
}
