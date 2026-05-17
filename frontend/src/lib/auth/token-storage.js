const STORAGE_KEY = "ttms_access_token"

export const tokenStorage = {
  get() {
    return localStorage.getItem(STORAGE_KEY)
  },
  set(token) {
    localStorage.setItem(STORAGE_KEY, token)
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}
