import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"

/**
 * Base URL of the FindBack REST API. When it is not configured the service
 * layer transparently falls back to the bundled mock dataset so the UI stays
 * fully explorable during development.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ""

export const isApiConfigured = API_BASE_URL.length > 0

const TOKEN_STORAGE_KEY = "findback.token"

/** In-memory token cache so server-side calls work without browser storage. */
let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
  if (typeof window === "undefined") return
  if (token) window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
  else window.sessionStorage.removeItem(TOKEN_STORAGE_KEY)
}

export function getAccessToken() {
  if (accessToken) return accessToken
  if (typeof window === "undefined") return null
  accessToken = window.sessionStorage.getItem(TOKEN_STORAGE_KEY)
  return accessToken
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
})

/** Attach the JWT to every outgoing request. */
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/** Normalise errors into a predictable shape for the UI. */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) setAccessToken(null)

    return Promise.reject(
      new ApiError(
        error.response?.data?.message ?? error.message ?? "Unexpected API error",
        error.response?.status,
      ),
    )
  },
)

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}
