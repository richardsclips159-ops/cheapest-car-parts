import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // You could read the body if you want:
  // const { vehicle, term } = await req.json()
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
