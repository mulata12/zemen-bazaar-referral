'use client'

export default function ReferralCard({ code, stats, onGenerate }: any) {
  const copy = async () => {
    if (!code) return
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/r/${code}`)
    alert('Link copied')
  }

  const share = async () => {
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/r/${code}`
    if (navigator.share) {
      await navigator.share({ title: 'Join ZemenBazaar', url })
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copied')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold">Your referral code</h2>
      <div className="flex justify-between items-center mt-2">
        <span className="text-2xl font-bold">{code ?? '—'}</span>
        <div className="flex gap-2">
          <button onClick={copy} className="px-3 py-1 bg-blue-500 text-white rounded">Copy Code</button>
          <button onClick={share} className="px-3 py-1 bg-gray-100 rounded">Share Link</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div className="p-2 border rounded">
          <div className="text-sm text-gray-500">Referrals</div>
          <div className="font-semibold">{stats?.referrals ?? 0}</div>
        </div>
        <div className="p-2 border rounded">
          <div className="text-sm text-gray-500">Rewards Earned</div>
          <div className="font-semibold">{stats?.rewardsEarned ?? 0} Birr</div>
        </div>
        <div className="p-2 border rounded">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="font-semibold">{stats?.pending ?? 0}</div>
        </div>
      </div>
    </div>
  )
}
