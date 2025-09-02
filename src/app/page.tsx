'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term: 'Oil Filter', vehicle: { year: 2020, make: 'VW', model: 'Golf' } })
    })
      .then(r => r.json())
      .then(d => setResults(d.results || []))
  }, [])

  return (
    <main>
      <h1>Cheapest Car Parts Finder</h1>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r.title} — €{r.landedEUR}</li>
        ))}
      </ul>
    </main>
  )

}
