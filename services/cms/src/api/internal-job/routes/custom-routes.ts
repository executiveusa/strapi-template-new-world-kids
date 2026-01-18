export default {
  routes: [
    {
      method: "POST",
      path: "/internal-job/fullpaths/recalculate/all",
      handler: "internal-job.runRecalculateFullpathAll",
      config: {
        // Internal tooling must send an Authorization Bearer token from a Strapi API token
        // (or authenticated user JWT) with permission to create internal jobs.
        auth: {
          scope: ["api::internal-job.internal-job.create"],
        },
      },
    },
    {
      method: "POST",
      path: "/internal-job/redirects/create/all",
      handler: "internal-job.runCreateRedirectsAll",
      config: {
        // Internal tooling must send an Authorization Bearer token from a Strapi API token
        // (or authenticated user JWT) with permission to create internal jobs.
        auth: {
          scope: ["api::internal-job.internal-job.create"],
        },
      },
    },
  ],
}
