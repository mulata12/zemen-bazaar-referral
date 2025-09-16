'use client'

import React from 'react'

type Referral = {
  id: number
  name: string
  role: string
  status: string
  reward: string
}

export default function ReferralTable({ items }: { items: Referral[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="border rounded p-4 text-gray-500 text-sm">
        No referrals yet. Share your code to invite friends!
      </div>
    )
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3">Referee</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Reward</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr key={i.id ?? idx} className="border-t hover:bg-gray-50">
              <td className="p-3">{i.name}</td>
              <td className="p-3">{i.role}</td>
              <td
                className={`p-3 capitalize ${
                  i.status.toLowerCase() === 'completed'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {i.status}
              </td>
              <td className="p-3">{i.reward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
