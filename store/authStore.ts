"use client"

import { create } from "zustand"

import { setAccessToken } from "@/lib/api/client"
import { authService, type LoginPayload, type RegisterPayload } from "@/services/authService"
import type { User } from "@/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isSubmitting: boolean
  error: string | null
  login: (payload: LoginPayload) => Promise<boolean>
  register: (payload: RegisterPayload) => Promise<boolean>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isSubmitting: false,
  error: null,

  login: async (payload) => {
    set({ isSubmitting: true, error: null })
    try {
      const session = await authService.login(payload)
      set({ user: session.user, isAuthenticated: true, isSubmitting: false })
      return true
    } catch (error) {
      set({
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Unable to sign in",
      })
      return false
    }
  },

  register: async (payload) => {
    set({ isSubmitting: true, error: null })
    try {
      const session = await authService.register(payload)
      set({ user: session.user, isAuthenticated: true, isSubmitting: false })
      return true
    } catch (error) {
      set({
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Unable to create account",
      })
      return false
    }
  },

  logout: async () => {
    await authService.logout()
    setAccessToken(null)
    set({ user: null, isAuthenticated: false })
  },

  clearError: () => set({ error: null }),
}))
