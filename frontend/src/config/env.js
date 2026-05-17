const raw = import.meta.env.VITE_API_URL ?? ""

export const env = {
  apiBaseUrl: raw.replace(/\/$/, ""),
}
