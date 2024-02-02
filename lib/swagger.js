import { createSwaggerSpec } from 'next-swagger-doc'

import 'server-only'

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Astrolabe Expeditions - Data platform API',
        version: '1.0',
      },
    },
  })
  return spec
}
