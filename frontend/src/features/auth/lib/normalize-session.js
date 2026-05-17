/**
 * Validates auth payload shape returned by login/register services.
 */
export function normalizeAuthSession(payload) {
  if (
    !payload ||
    typeof payload !== "object" ||
    typeof payload.token !== "string" ||
    !payload.user ||
    typeof payload.user !== "object"
  ) {
    throw new Error("Invalid authentication response from server")
  }

  return {
    token: payload.token,
    user: payload.user,
  }
}
