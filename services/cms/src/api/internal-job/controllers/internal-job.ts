/**
 * internal-job controller
 */

import { factories } from "@strapi/strapi"
import { timingSafeEqual } from "crypto"

export default factories.createCoreController(
  "api::internal-job.internal-job",
  ({ strapi }) => {
    const ensureAuthorized = (ctx) => {
      // Expect a static internal API token provided via Authorization: Bearer <token>.
      const expectedToken = process.env.INTERNAL_JOB_TOKEN
      const authorization = ctx.request.headers.authorization ?? ""
      const token = authorization.replace(/^Bearer\s+/i, "")

      if (!expectedToken) {
        strapi.log.error(
          "Internal job token is not configured; refusing to execute internal job."
        )
        ctx.internalServerError("Service unavailable.")
        return false
      }

      // Use timing-safe comparison to prevent timing attacks
      if (!token || token.length !== expectedToken.length) {
        strapi.log.warn("Unauthorized internal job request blocked.", {
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
          strapi.log.warn("Unauthorized internal job request blocked.", {
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
        strapi.log.warn("Unauthorized internal job request blocked.", {
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

    return {
      runRecalculateFullpathAll: async (ctx) => {
        if (!ensureAuthorized(ctx)) {
          return
        }

        const result = await strapi
          .service("api::internal-job.internal-job")
          .runAll("RECALCULATE_FULLPATH")

        return result
      },

      runCreateRedirectsAll: async (ctx) => {
        if (!ensureAuthorized(ctx)) {
          return
        }

        const result = await strapi
          .service("api::internal-job.internal-job")
          .runAll("CREATE_REDIRECT")

        return result
      },
    }
  }
)
