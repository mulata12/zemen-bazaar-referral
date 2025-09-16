import { redirect } from 'next/navigation'

export default async function RedirectPage({ params }: { params: { code: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referral/attribution/create?code=${params.code}`, {
    method: 'POST',
    cache: 'no-store'
  })

  if (!res.ok) {
    return <div className="p-6">Invalid referral code</div>
  }

  const { attrToken } = await res.json()

  // ⚠️ Cookies in App Router are set via `cookies()` API on server — needs backend support
  redirect('/signup')
}


