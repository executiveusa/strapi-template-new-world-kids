import config from '@payload-config'
import { REST_GET, REST_POST, REST_PATCH, REST_DELETE } from '@payloadcms/next/routes'

const handlers = { GET: REST_GET, POST: REST_POST, PATCH: REST_PATCH, DELETE: REST_DELETE }

export { handlers as GET, handlers as POST, handlers as PATCH, handlers as DELETE }
