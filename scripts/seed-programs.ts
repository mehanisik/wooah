import { api } from '../convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

const CONVEX_URL = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL
if (!CONVEX_URL) {
  console.error(
    'Set CONVEX_URL or NEXT_PUBLIC_CONVEX_URL environment variable'
  )
  process.exit(1)
}

const client = new ConvexHttpClient(CONVEX_URL)

console.log('Seeding global programs...')
const result = await client.action(api.programs.seedGlobalPrograms, {})
console.log(
  `Done: ${result.inserted} inserted, ${result.skipped} skipped, ${result.total} total`
)
