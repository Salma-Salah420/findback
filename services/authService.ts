import { apiClient, setAccessToken } from "@/lib/api/client"
import type { AuthSession, User, UserRole } from "@/types"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  phone: string
  password: string
  role: UserRole
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const { data } = await apiClient.post<AuthSession>("/auth/login", payload)
    setAccessToken(data.token)
    return data
  },

  async register(payload: RegisterPayload): Promise<AuthSession> {
    const { data } = await apiClient.post<AuthSession>("/auth/register", payload)
    setAccessToken(data.token)
    return data
  },

  async me(): Promise<User> {
    const { data } = await apiClient.get<User>("/auth/me")
    return data
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout")
    } finally {
      setAccessToken(null)
    }
  },
}
