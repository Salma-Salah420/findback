/**
 * Shared domain types for the FindBack Lost & Found platform.
 * These mirror the shapes the REST API is expected to return.
 */

export type ReportType = "lost" | "found" | "missing_child"

export type ReportStatus = "active" | "matched" | "resolved" | "closed"

export type CategorySlug =
  | "electronics"
  | "documents"
  | "bags"
  | "pets"
  | "children"
  | "jewelry"
  | "other"

export type UserRole = "individual" | "organization" | "authority"

export interface Category {
  slug: CategorySlug
  /** Translation key used to resolve the display label. */
  labelKey: string
  /** Lucide icon name rendered by the CategoryCard. */
  icon: string
  count: number
}

export interface ReportLocation {
  city: string
  address: string
  /** Optional coordinates, used by the map placeholder. */
  lat?: number
  lng?: number
}

export interface ReportOwner {
  id: string
  name: string
  avatarUrl?: string
  phone?: string
  email?: string
  verified: boolean
  memberSince: string
  reportsCount: number
}

export interface Report {
  id: string
  type: ReportType
  category: CategorySlug
  title: string
  description: string
  images: string[]
  location: ReportLocation
  /** ISO date the item was lost / found. */
  date: string
  createdAt: string
  status: ReportStatus
  reward?: number
  owner: ReportOwner
  /** Confidence score (0-100) produced by the Smart Match engine. */
  matchScore?: number
  tags?: string[]
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatarUrl?: string
  city?: string
  createdAt: string
}

export interface AuthSession {
  token: string
  user: User
}

export interface ReportFilters {
  query?: string
  type?: ReportType | "all"
  category?: CategorySlug | "all"
  city?: string | "all"
  /** Restrict results to reports created within the last N days. */
  withinDays?: number | "all"
  sort?: "newest" | "oldest" | "relevance"
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface AppNotification {
  id: string
  title: string
  body: string
  createdAt: string
  read: boolean
  kind: "match" | "message" | "system"
  href?: string
}
