'use client'
import { useEffect, useState } from 'react'

type Vehicle = { year: number; make: string; model: string; engine?: string }
type Result = {
  title: string
  url: string
  source: string
  vendorSku: string
  oem?: string[]
  mpn?: string[]
  gtin?: string[]
  price: number
  currency: 'EUR' | 'GBP' | 'USD'
  shipping: number
  shipFrom: string
  etaDays: number
  inStock: boolean
  notes: string[]
  landedEUR: number
  partKey: string
}

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)

export default function Home() {
  const [vehicle, setVehicle] = useState<Vehicle>({
    year: YEARS[9], make: 'VW', model: 'Golf', engine: '1.6 TDI'
  })
  const [term, setTerm] = useState('Oil Filter')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [error, setError] = useState<string | null>(null)

  async function search() {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicle, term })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Search failed')
      setResults(data.results || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { search() }, [])

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-semibold">Cheapest Car Parts Finder</h1>
      <p className="text-sm opacity-70">
        All-in pricing: base + shipping + VAT + customs (if applicable).
      </p>

      <div className="grid sm:grid-cols-5 gap-2 bg-white rounded-xl shadow p-4">
        <select
          className="border rounded-lg p-2"
          value={vehicle.year}
          onChange={e => setVehicle({ ...vehicle, year: Number(e.target.value) })}
        >
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <input
          className="border rounded-lg p-2"
          placeholder="Make"
          value={vehicle.make}
          onChange={e => setVehicle({ ...vehicle, make: e.target.value })}
        />
        <input
          className="border rounded-lg p-2"
          placeholder="Model"
          value={vehicle.model}
          onChange={e => setVehicle({ ...vehicle, model: e.target.value })}
        />
        <input
          className="border rounded-lg p-2"
          placeholder="Engine"
          value={vehicle.engine || ''}
          onChange={e => setVehicle({ ...vehicle, engine: e.target.value })}
        />
        <input
          className="border rounded-lg p-2"
          placeholder="Part (e.g., Oil Filter)"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
        <div className="sm:col-span-5 flex gap-2">
          <button
            onClick={search}
            disabled={loading}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2">Listing</th>
              <th className="p-2">Base</th>
              <th className="p-2">Ship</th>
              <th className="p-2">From</th>
              <th className="p-2">ETA</th>
              <th className="p-2">All-in (EUR)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={`${r.partKey}-${i}`} className="border-t">
                <td className="p-2">
                  <a href={r.url} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                    {r.title}
                  </a>
                  <div className="opacity-60">
                    {r.source} • {r.vendorSku} {r.oem?.[0] || r.mpn?.[0] || r.gtin?.[0]}
                  </div>
                  {r.notes?.length > 0 && (
                    <div className="text-xs opacity-70">{r.notes.join(' · ')}</div>
                  )}
                </td>
                <td className="p-2">
                  {r.currency === 'EUR' ? `€${r.price.toFixed(2)}` :
                   r.currency === 'GBP' ? `£${r.price.toFixed(2)}` :
                   `$${r.price.toFixed(2)}`}
                </td>
                <td className="p-2">
                  {r.currency === 'EUR' ? `€${r.shipping.toFixed(2)}` :
                   r.currency === 'GBP' ? `£${r.shipping.toFixed(2)}` :
                   `$${r.shipping.toFixed(2)}`}
                </td>
                <td className="p-2">{r.shipFrom}</td>
                <td className="p-2">~{r.etaDays}d</td>
                <td className="p-2 font-semibold">€{r.landedEUR.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {results.length === 0 && !loading && (
          <div className="text-sm opacity-70">No results (try another part term).</div>
        )}
        <div className="text-xs opacity-60 mt-2">
          Prices include placeholder VAT/customs; vendor pages are the source of truth.
        </div>
      </div>
    </main>
  )
                  }
