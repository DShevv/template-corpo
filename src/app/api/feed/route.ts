import { getApiUrl } from "@/services/base";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const apiUrl = getApiUrl();
  const res = await fetch(`${apiUrl}/v1/seo/feed.xml`);
  const xml = await res.text();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
