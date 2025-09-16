'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'

export const useDashboard = () =>
  useQuery(['referral','dashboard'], async () => {
    const { data } = await api.get('/referral/my')
    return data
  })

export const useGenerateCode = () => {
  const qc = useQueryClient()
  return useMutation(
    (payload: { role: string }) => api.post('/referral/code/generate', payload),
    { onSuccess: () => qc.invalidateQueries(['referral','dashboard']) }
  )
}
  

