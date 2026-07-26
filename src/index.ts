import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/auth.routes.js'

const app = new Hono()

// Enable CORS for frontend cross-origin requests
app.use('*', cors())

// Root health check endpoint
app.get('/', (c) => c.json({ status: 'online', message: 'GemoStone Auth API' }))

// Mount Auth routes (MVC Architecture)
app.route('/', authRoutes)

const port = Number(process.env.PORT) || 3000

console.log(`🚀 Hono Node.js Server listening on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})

export default app
