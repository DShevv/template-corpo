import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    apiUrl: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '',
    siteUrl: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '',
    siteName: process.env.SITE_NAME || process.env.NEXT_PUBLIC_SITE_NAME || 'webspaceteam.site',
    storeUrl: process.env.STORE_URL || process.env.NEXT_PUBLIC_STORE_URL || '',
  };

  return NextResponse.json(config);
} 