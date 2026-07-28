import { apiClient } from "@/lib/api/client"
import type { AppNotification, Report, User } from "@/types"

export interface UpdateProfilePayload {
  name?: string
  phone?: string
  city?: string
  avatarUrl?: string
}

export const userService = {
  async getProfile(userId: string): Promise<User> {
    const { data } = await apiClient.get<User>(`/users/${userId}`)
    return data
  },

  async updateProfile(userId: string, payload: UpdateProfilePayload): Promise<User> {
    const { data } = await apiClient.patch<User>(`/users/${userId}`, payload)
    return data
  },

  async getMyReports(params?: { type?: Report["type"] }): Promise<Report[]> {
    const { data } = await apiClient.get<Report[]>("/users/me/reports", { params })
    return data
  },

  async getNotifications(): Promise<AppNotification[]> {
    const { data } = await apiClient.get<AppNotification[]>("/users/me/notifications")
    return data
  },

  async markNotificationRead(id: string): Promise<void> {
    await apiClient.post(`/users/me/notifications/${id}/read`)
  },
}
