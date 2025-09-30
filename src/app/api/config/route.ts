import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    apiUrl: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '',
    siteUrl: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '',
    storeUrl: process.env.STORAGE_URL || process.env.NEXT_PUBLIC_STORAGE_URL || '',
  };

  return NextResponse.json(config);
} 