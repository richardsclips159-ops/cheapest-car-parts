import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  return NextResponse.json({
    results: [{ title: 'Mock Oil Filter', landedEUR: 19.99 }]
  })

}
