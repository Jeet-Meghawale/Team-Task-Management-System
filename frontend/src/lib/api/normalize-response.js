/**
 * Normalizes backend JSON bodies. Many controllers pass `(success, msg, payload)` into
 * `ApiResponse` while its constructor expects `(success, statusCode, message, data)`,
 * so the real payload often lands in `message` when it is an object.
 */
export function unwrapApiPayload(body) {
  if (body == null || typeof body !== "object") return body
  if (body.data != null) return body.data
  if (
    typeof body.message === "object" &&
    body.message !== null &&
    !Array.isArray(body.message)
  ) {
    return body.message
  }
  return body.message ?? null
}
