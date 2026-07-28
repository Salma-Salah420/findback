"use client"

import { create } from "zustand"

import type { AppNotification } from "@/types"

interface NotificationState {
  notifications: AppNotification[]
  unreadCount: number
  setNotifications: (notifications: AppNotification[]) => void
  push: (notification: AppNotification) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

const countUnread = (items: AppNotification[]) => items.filter((n) => !n.read).length

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) =>
    set({ notifications, unreadCount: countUnread(notifications) }),

  push: (notification) => {
    const notifications = [notification, ...get().notifications]
    set({ notifications, unreadCount: countUnread(notifications) })
  },

  markRead: (id) => {
    const notifications = get().notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    set({ notifications, unreadCount: countUnread(notifications) })
  },

  markAllRead: () => {
    const notifications = get().notifications.map((n) => ({ ...n, read: true }))
    set({ notifications, unreadCount: 0 })
  },
}))
