const ALLOWED_ORIGIN = 'https://static.exercisedb.dev/media/'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url?.startsWith(ALLOWED_ORIGIN)) {
    return new Response('Forbidden', { status: 403 })
  }

  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(10_000) })

    if (!resp.ok) {
      return new Response('Not found', { status: resp.status })
    }

    return new Response(resp.body, {
      headers: {
        'Content-Type': resp.headers.get('Content-Type') || 'image/gif',
        'Cache-Control': 'public, max-age=2592000, immutable',
      },
    })
  } catch {
    return new Response('Upstream timeout', { status: 504 })
  }
}
