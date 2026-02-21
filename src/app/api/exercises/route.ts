const UPSTREAM = 'https://exercisedb-api.vercel.app/api/v1/exercises'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const params = new URLSearchParams()

  for (const key of ['search', 'limit', 'offset']) {
    const val = searchParams.get(key)
    if (val) params.set(key, val)
  }

  const url = `${UPSTREAM}?${params.toString()}`

  try {
    const resp = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
      headers: { Accept: 'application/json' },
    })

    if (!resp.ok) {
      return Response.json(
        { error: `Upstream ${resp.status}` },
        { status: resp.status }
      )
    }

    const data = await resp.json()
    return Response.json(data, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    })
  } catch {
    return Response.json({ error: 'Upstream timeout' }, { status: 504 })
  }
}
