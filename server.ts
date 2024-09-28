import { createRequestHandler } from '@remix-run/architect'
import * as build from './build/server/index.js'

export const handler = createRequestHandler({
  build,
})
