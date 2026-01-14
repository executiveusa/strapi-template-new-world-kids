import { Event } from "@strapi/database/dist/lifecycles"
import { Core } from "@strapi/strapi"

export const registerAdminUserSubscriber = async ({
  strapi,
}: {
  strapi: Core.Strapi
}) => {
  strapi.db.lifecycles.subscribe({
    models: ["admin::user"],

    async afterCreate(event) {
      try {
        await sendEmail(strapi, event)
      } catch (error) {
        strapi.log.error(
          "Failed to send admin registration email after user creation.",
          {
            error: formatLifecycleError(error),
            userId: event.result?.id,
            email: event.result?.email,
          }
        )
      }
    },
  })
}

/**
 * Send email after registration to admin strapi panel.
 * Email is sent:
 *  - if the admin is created from the admin panel
 */
const sendEmail = async (strapi: Core.Strapi, event: Event) => {
  const { email, registrationToken } = event.result ?? {}

  if (registrationToken && email) {
    const html = `<h2>Welcome to our team!</h2> <h3>We have created an administrator account for you</h3><p>
           To access the administration panel, click <a href="${process.env.APP_URL}/admin/auth/register?registrationToken=${registrationToken}" target="_blank">here</a>.
         </p>`

    try {
      await strapi.plugins["email"].services.email.send({
        to: email,
        subject: "Strapi invitation to the administration panel",
        html,
      })
    } catch (e) {
      strapi.log.error("Error sending admin registration email.", {
        error: formatLifecycleError(e),
        email,
      })
      throw e
    }
  }
}

const formatLifecycleError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
    }
  }

  return { message: String(error) }
}
