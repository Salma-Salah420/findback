"use client"

import { create } from "zustand"

import { reportService } from "@/services/reportService"
import type { Report, ReportFilters } from "@/types"

export const defaultFilters: ReportFilters = {
  query: "",
  type: "all",
  category: "all",
  city: "all",
  withinDays: "all",
  sort: "newest",
}

interface ReportState {
  reports: Report[]
  total: number
  filters: ReportFilters
  isLoading: boolean
  error: string | null
  setFilter: <K extends keyof ReportFilters>(key: K, value: ReportFilters[K]) => void
  /** Merges a partial filter patch, then refetches. */
  setFilters: (patch: Partial<ReportFilters>) => void
  resetFilters: () => void
  fetchReports: () => Promise<void>
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: [],
  total: 0,
  filters: defaultFilters,
  isLoading: true,
  error: null,

  setFilter: (key, value) => {
    set({ filters: { ...get().filters, [key]: value } })
    void get().fetchReports()
  },

  setFilters: (patch) => {
    set({ filters: { ...get().filters, ...patch } })
    void get().fetchReports()
  },

  resetFilters: () => {
    set({ filters: defaultFilters })
    void get().fetchReports()
  },

  fetchReports: async () => {
    set({ isLoading: true, error: null })
    try {
      const { items, total } = await reportService.list(get().filters)
      set({ reports: items, total, isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load reports",
      })
    }
  },
}))

/** Count of filters that differ from their default value. */
export function activeFilterCount(filters: ReportFilters) {
  return (["type", "category", "city", "withinDays"] as const).filter(
    (key) => filters[key] !== defaultFilters[key],
  ).length
}
