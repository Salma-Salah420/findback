import { apiClient, isApiConfigured } from "@/lib/api/client"
import { mockCategories, mockCities, mockReports, mockStats } from "@/lib/mock/data"
import type { Category, Paginated, Report, ReportFilters } from "@/types"

const MOCK_LATENCY = 450

const delay = (ms = MOCK_LATENCY) => new Promise((resolve) => setTimeout(resolve, ms))

/** Applies the filter set client-side. Mirrors the server query semantics. */
function applyFilters(reports: Report[], filters: ReportFilters): Report[] {
  const query = filters.query?.trim().toLowerCase()

  let result = reports.filter((report) => {
    if (filters.type && filters.type !== "all" && report.type !== filters.type) return false
    if (filters.category && filters.category !== "all" && report.category !== filters.category)
      return false
    if (filters.city && filters.city !== "all" && report.location.city !== filters.city) return false

    if (filters.withinDays && filters.withinDays !== "all") {
      const cutoff = Date.now() - filters.withinDays * 24 * 60 * 60 * 1000
      if (new Date(report.createdAt).getTime() < cutoff) return false
    }

    if (query) {
      const haystack = [
        report.title,
        report.description,
        report.location.city,
        report.location.address,
        ...(report.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }

    return true
  })

  const sort = filters.sort ?? "newest"
  result = [...result].sort((a, b) => {
    if (sort === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    if (sort === "relevance") return (b.matchScore ?? 0) - (a.matchScore ?? 0)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return result
}

export const reportService = {
  async list(filters: ReportFilters = {}): Promise<Paginated<Report>> {
    if (isApiConfigured) {
      const { data } = await apiClient.get<Paginated<Report>>("/reports", { params: filters })
      return data
    }

    await delay()
    const items = applyFilters(mockReports, filters)
    return { items, total: items.length, page: 1, pageSize: items.length }
  },

  async getById(id: string): Promise<Report | null> {
    if (isApiConfigured) {
      const { data } = await apiClient.get<Report>(`/reports/${id}`)
      return data
    }

    await delay(250)
    return mockReports.find((report) => report.id === id) ?? null
  },

  /** Listings that share the category or city of the given report. */
  async getSimilar(id: string, limit = 3): Promise<Report[]> {
    if (isApiConfigured) {
      const { data } = await apiClient.get<Report[]>(`/reports/${id}/similar`, {
        params: { limit },
      })
      return data
    }

    await delay(250)
    const source = mockReports.find((report) => report.id === id)
    if (!source) return []

    return mockReports
      .filter(
        (report) =>
          report.id !== source.id &&
          (report.category === source.category || report.location.city === source.location.city),
      )
      .slice(0, limit)
  },

  /**
   * Candidate matches produced by the Smart Match engine. Until the AI service
   * ships this returns the highest-scoring listings from the dataset.
   */
  async getSmartMatches(limit = 2): Promise<Report[]> {
    if (isApiConfigured) {
      const { data } = await apiClient.get<Report[]>("/reports/smart-matches", {
        params: { limit },
      })
      return data
    }

    await delay(300)
    return mockReports
      .filter((report) => typeof report.matchScore === "number")
      .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
      .slice(0, limit)
  },

  async create(payload: FormData | Record<string, unknown>): Promise<Report> {
    const { data } = await apiClient.post<Report>("/reports", payload)
    return data
  },

  async getCategories(): Promise<Category[]> {
    if (isApiConfigured) {
      const { data } = await apiClient.get<Category[]>("/categories")
      return data
    }
    return mockCategories
  },

  async getCities(): Promise<string[]> {
    if (isApiConfigured) {
      const { data } = await apiClient.get<string[]>("/cities")
      return data
    }
    return mockCities
  },

  async getStats(): Promise<typeof mockStats> {
    if (isApiConfigured) {
      const { data } = await apiClient.get<typeof mockStats>("/stats")
      return data
    }
    return mockStats
  },
}
