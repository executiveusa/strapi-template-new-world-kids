import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    APP_PUBLIC_URL: z.string().url().optional(),
    DEBUG_STATIC_PARAMS_GENERATION: optionalZodBoolean(),
    SHOW_NON_BLOCKING_ERRORS: optionalZodBoolean(),
    DEBUG_STRAPI_CLIENT_API_CALLS: optionalZodBoolean(),
    STRAPI_URL: z.string().url().optional(),
    STRAPI_REST_READONLY_API_KEY: z.string().optional(),
    STRAPI_REST_CUSTOM_API_KEY: z.string().optional(),
    STRAPI_PREVIEW_SECRET: z.string().optional(),
    NEXT_OUTPUT: z.string().optional(),
    BETTER_AUTH_URL: z.string().url().optional(),
    BETTER_AUTH_SECRET: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING: z.string().optional(),
    RECAPTCHA_SECRET_KEY: z.string().optional(),
    BASIC_AUTH_ENABLED: optionalZodBoolean(),
    BASIC_AUTH_USERNAME: z.string().optional(),
    BASIC_AUTH_PASSWORD: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),
    NEXT_PUBLIC_PREVENT_UNUSED_FUNCTIONS_ERROR_LOGS: optionalZodBoolean(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production"]).optional(),
    APP_ENV: z.enum(["testing", "production"]).optional(),
  },
  runtimeEnv: {
    APP_PUBLIC_URL: process.env.APP_PUBLIC_URL,
    DEBUG_STATIC_PARAMS_GENERATION: process.env.DEBUG_STATIC_PARAMS_GENERATION,
    DEBUG_STRAPI_CLIENT_API_CALLS: process.env.DEBUG_STRAPI_CLIENT_API_CALLS,
    SHOW_NON_BLOCKING_ERRORS: process.env.SHOW_NON_BLOCKING_ERRORS,
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_REST_READONLY_API_KEY: process.env.STRAPI_REST_READONLY_API_KEY,
    STRAPI_REST_CUSTOM_API_KEY: process.env.STRAPI_REST_CUSTOM_API_KEY,
    STRAPI_PREVIEW_SECRET: process.env.STRAPI_PREVIEW_SECRET,
    NEXT_OUTPUT: process.env.NEXT_OUTPUT,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING:
      process.env.SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    BASIC_AUTH_ENABLED: process.env.BASIC_AUTH_ENABLED,
    BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
    BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_PREVENT_UNUSED_FUNCTIONS_ERROR_LOGS:
      process.env.NEXT_PUBLIC_PREVENT_UNUSED_FUNCTIONS_ERROR_LOGS,
    NODE_ENV: process.env.NODE_ENV,
    APP_ENV: process.env.APP_ENV,
  },
})

function optionalZodBoolean() {
  return z
    .string()
    .toLowerCase()
    .transform((x) => x === "true")
    .pipe(z.boolean())
    .optional()
}
