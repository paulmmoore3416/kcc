import { NextResponse } from 'next/server'

export async function GET() {
  const mgmtToken = process.env.SPEECHMATICS_MGMT_TOKEN

  if (!mgmtToken) {
    return NextResponse.json({ error: 'Management token not configured' }, { status: 500 })
  }

  try {
    const response = await fetch('https://management.api.speechmatics.com/v1/api_keys', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mgmtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'kcc-frontend-session',
        ttl: 3600,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: 'Failed to fetch Speechmatics token', details: errorData }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ token: data.key })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
