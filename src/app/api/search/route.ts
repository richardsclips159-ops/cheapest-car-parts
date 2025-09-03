import { NextRequest, NextResponse } from 'next/server'

export async function POST(_req: NextRequest) {
  // You could read the request body if needed:
  // const { vehicle, term } = await _req.json()

  return NextResponse.json({
    results: [
      {
        title: 'Bosch Oil Filter P1234 (VW Golf 1.6 TDI)',
        url: '#',
        source: 'Ebay',
        vendorSku: 'EB-001',
        oem: ['04L115561H'],
        mpn: ['P1234'],
        gtin: ['4047021234567'],
        price: 9.99,
        currency: 'GBP',
        shipping: 4.5,
        shipFrom: 'GB',
        etaDays: 6,
        inStock: true,
        notes: ['GB → IE: customs est. included'],
        landedEUR: 19.99,
        partKey: '04L115561H'
      },
      {
        title: 'Ridex Oil Filter 7O0002',
        url: '#',
        source: 'Autodoc',
        vendorSku: 'AD-001',
        mpn: ['7O0002'],
        gtin: ['4059191234567'],
        price: 6.49,
        currency: 'EUR',
        shipping: 6.95,
        shipFrom: 'DE',
        etaDays: 7,
        inStock: true,
        notes: [],
        landedEUR: 16.5,
        partKey: '7O0002'
      }
    ]
  })
}
