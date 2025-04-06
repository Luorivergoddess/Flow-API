"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  email: string
  token: string
}

interface AuthState {
  user: User | null
  login: (user: User) => void
  register: (user: User) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      register: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
