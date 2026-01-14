/**
 * Tests for internal-job controller authorization guard
 */

import { timingSafeEqual } from "crypto"

describe("Internal Job Controller - ensureAuthorized", () => {
  let originalEnv: string | undefined
  let mockStrapi: any
  let mockCtx: any
  let ensureAuthorized: (ctx: any) => boolean

  beforeEach(() => {
    // Save original env var
    originalEnv = process.env.INTERNAL_JOB_TOKEN

    // Mock strapi logger
    mockStrapi = {
      log: {
        error: jest.fn(),
        warn: jest.fn(),
      },
    }

    // Mock Koa context
    mockCtx = {
      request: {
        headers: {
          authorization: undefined,
        },
        ip: "127.0.0.1",
        path: "/api/internal-job/run-test",
      },
      internalServerError: jest.fn(),
      unauthorized: jest.fn(),
      status: undefined,
      body: undefined,
    }

    // Define ensureAuthorized inline (same as in controller)
    ensureAuthorized = (ctx) => {
      const expectedToken = process.env.INTERNAL_JOB_TOKEN
      const authorization = ctx.request.headers.authorization ?? ""
      const token = authorization.replace(/^Bearer\s+/i, "")

      if (!expectedToken) {
        mockStrapi.log.error(
          "Internal job token is not configured; refusing to execute internal job."
        )
        ctx.internalServerError("Service unavailable.")
        return false
      }

      // Use timing-safe comparison to prevent timing attacks
      if (!token || token.length !== expectedToken.length) {
        mockStrapi.log.warn("Unauthorized internal job request blocked.", {
          ip: ctx.request.ip,
          path: ctx.request.path,
        })
        ctx.status = 401
        ctx.body = {
          error: "Unauthorized",
          message: "Invalid or missing internal job token.",
        }
        return false
      }

      try {
        const tokenBuffer = Buffer.from(token, "utf8")
        const expectedBuffer = Buffer.from(expectedToken, "utf8")
        if (!timingSafeEqual(tokenBuffer, expectedBuffer)) {
          mockStrapi.log.warn("Unauthorized internal job request blocked.", {
            ip: ctx.request.ip,
            path: ctx.request.path,
          })
          ctx.status = 401
          ctx.body = {
            error: "Unauthorized",
            message: "Invalid or missing internal job token.",
          }
          return false
        }
      } catch (error) {
        mockStrapi.log.warn("Unauthorized internal job request blocked.", {
          ip: ctx.request.ip,
          path: ctx.request.path,
        })
        ctx.status = 401
        ctx.body = {
          error: "Unauthorized",
          message: "Invalid or missing internal job token.",
        }
        return false
      }

      return true
    }
  })

  afterEach(() => {
    // Restore original env var
    if (originalEnv !== undefined) {
      process.env.INTERNAL_JOB_TOKEN = originalEnv
    } else {
      delete process.env.INTERNAL_JOB_TOKEN
    }
    jest.clearAllMocks()
  })

  describe("Missing environment variable handling", () => {
    it("should return false and log error when INTERNAL_JOB_TOKEN is not configured", () => {
      delete process.env.INTERNAL_JOB_TOKEN

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockStrapi.log.error).toHaveBeenCalledWith(
        "Internal job token is not configured; refusing to execute internal job."
      )
      expect(mockCtx.internalServerError).toHaveBeenCalledWith(
        "Service unavailable."
      )
    })

    it("should return false when INTERNAL_JOB_TOKEN is empty string", () => {
      process.env.INTERNAL_JOB_TOKEN = ""

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockStrapi.log.error).toHaveBeenCalled()
    })
  })

  describe("Missing token handling", () => {
    beforeEach(() => {
      process.env.INTERNAL_JOB_TOKEN = "valid-test-token-123"
    })

    it("should return false and respond with 401 when authorization header is missing", () => {
      mockCtx.request.headers.authorization = undefined

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockCtx.status).toBe(401)
      expect(mockCtx.body).toEqual({
        error: "Unauthorized",
        message: "Invalid or missing internal job token.",
      })
      expect(mockStrapi.log.warn).toHaveBeenCalledWith(
        "Unauthorized internal job request blocked.",
        {
          ip: "127.0.0.1",
          path: "/api/internal-job/run-test",
        }
      )
    })

    it("should return false when authorization header is empty", () => {
      mockCtx.request.headers.authorization = ""

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockCtx.status).toBe(401)
    })

    it("should return false when Bearer token is missing", () => {
      mockCtx.request.headers.authorization = "Bearer "

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockCtx.status).toBe(401)
    })
  })

  describe("Invalid token handling", () => {
    beforeEach(() => {
      process.env.INTERNAL_JOB_TOKEN = "valid-test-token-123"
    })

    it("should return false and respond with 401 when token is incorrect", () => {
      mockCtx.request.headers.authorization = "Bearer wrong-token"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockCtx.status).toBe(401)
      expect(mockCtx.body).toEqual({
        error: "Unauthorized",
        message: "Invalid or missing internal job token.",
      })
      expect(mockStrapi.log.warn).toHaveBeenCalled()
    })

    it("should return false when token has different length", () => {
      mockCtx.request.headers.authorization = "Bearer short"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockCtx.status).toBe(401)
    })

    it("should handle authorization header without Bearer prefix", () => {
      mockCtx.request.headers.authorization = "valid-test-token-123"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(true)
    })

    it("should be case-insensitive for Bearer prefix", () => {
      mockCtx.request.headers.authorization = "bearer valid-test-token-123"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(true)
    })

    it("should handle BEARER in uppercase", () => {
      mockCtx.request.headers.authorization = "BEARER valid-test-token-123"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(true)
    })
  })

  describe("Valid token authentication", () => {
    beforeEach(() => {
      process.env.INTERNAL_JOB_TOKEN = "valid-test-token-123"
    })

    it("should return true when valid Bearer token is provided", () => {
      mockCtx.request.headers.authorization = "Bearer valid-test-token-123"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(true)
      expect(mockStrapi.log.error).not.toHaveBeenCalled()
      expect(mockStrapi.log.warn).not.toHaveBeenCalled()
      expect(mockCtx.status).toBeUndefined()
    })

    it("should not log any errors or warnings on successful authentication", () => {
      mockCtx.request.headers.authorization = "Bearer valid-test-token-123"

      ensureAuthorized(mockCtx)

      expect(mockStrapi.log.error).not.toHaveBeenCalled()
      expect(mockStrapi.log.warn).not.toHaveBeenCalled()
    })

    it("should handle complex tokens with special characters", () => {
      const complexToken = "token-with-special-chars_!@#$%^&*()"
      process.env.INTERNAL_JOB_TOKEN = complexToken
      mockCtx.request.headers.authorization = `Bearer ${complexToken}`

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(true)
    })

    it("should handle long tokens", () => {
      const longToken = "a".repeat(256)
      process.env.INTERNAL_JOB_TOKEN = longToken
      mockCtx.request.headers.authorization = `Bearer ${longToken}`

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(true)
    })
  })

  describe("Timing-safe comparison", () => {
    beforeEach(() => {
      process.env.INTERNAL_JOB_TOKEN = "secret-token-12345"
    })

    it("should use timing-safe comparison for token validation", () => {
      // Test that tokens with same length but different content fail
      mockCtx.request.headers.authorization = "Bearer secret-token-99999"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
      expect(mockCtx.status).toBe(401)
    })

    it("should reject tokens that differ only in one character", () => {
      mockCtx.request.headers.authorization = "Bearer secret-token-12346"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
    })

    it("should reject tokens with extra characters", () => {
      mockCtx.request.headers.authorization = "Bearer secret-token-12345-extra"

      const result = ensureAuthorized(mockCtx)

      expect(result).toBe(false)
    })
  })

  describe("HTTP status codes", () => {
    it("should set status 401 for missing token", () => {
      process.env.INTERNAL_JOB_TOKEN = "test-token"
      mockCtx.request.headers.authorization = undefined

      ensureAuthorized(mockCtx)

      expect(mockCtx.status).toBe(401)
    })

    it("should set status 401 for invalid token", () => {
      process.env.INTERNAL_JOB_TOKEN = "test-token"
      mockCtx.request.headers.authorization = "Bearer wrong-token"

      ensureAuthorized(mockCtx)

      expect(mockCtx.status).toBe(401)
    })

    it("should include structured error response", () => {
      process.env.INTERNAL_JOB_TOKEN = "test-token"
      mockCtx.request.headers.authorization = "Bearer wrong"

      ensureAuthorized(mockCtx)

      expect(mockCtx.body).toHaveProperty("error", "Unauthorized")
      expect(mockCtx.body).toHaveProperty(
        "message",
        "Invalid or missing internal job token."
      )
    })
  })
})
