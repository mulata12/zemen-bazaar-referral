'use client'

import React from 'react'
import { FaShareAlt, FaUserPlus, FaGift } from 'react-icons/fa'

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaShareAlt className="text-blue-500" />,
      title: 'Share your code',
      desc: 'Send your referral link or code.',
    },
    {
      icon: <FaUserPlus className="text-blue-500" />,
      title: 'Friend signs up',
      desc: 'Friend registers and makes their first action.',
    },
    {
      icon: <FaGift className="text-blue-500" />,
      title: 'You both earn rewards',
      desc: 'Earn wallet credit or discounts together.',
    },
  ]

  return (
    <div className="bg-white border rounded-xl shadow p-4">
      <h4 className="font-semibold mb-4">How It Works</h4>
      <ul className="space-y-4">
        {steps.map((s, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full">
              {s.icon}
            </div>
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-gray-600">{s.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
