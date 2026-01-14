/**
 * internal-job controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController(
  "api::internal-job.internal-job",
  ({ strapi }) => {
    const ensureAuthorized = (ctx) => {
      // Expect a static internal API token provided via Authorization: Bearer <token>.
      const expectedToken = process.env.INTERNAL_JOB_TOKEN
      const authorization = ctx.request.header.authorization ?? ""
      const token = authorization.replace(/^Bearer\s+/i, "")

      if (!expectedToken) {
        strapi.log.error(
          "Internal job token is not configured; refusing to execute internal job."
        )
        ctx.internalServerError("Internal job token is not configured.")
        return false
      }

      if (!token || token !== expectedToken) {
        strapi.log.warn("Unauthorized internal job request blocked.", {
          ip: ctx.request.ip,
          path: ctx.request.path,
        })
        ctx.unauthorized("Unauthorized.")
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
