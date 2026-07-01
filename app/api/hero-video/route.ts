import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const videoUrl = "https://sdgenxchgjsoyoecoctv.supabase.co/storage/v1/object/public/assets/team-video.mp4";

  const range = request.headers.get("range");
  const headers: Record<string, string> = {};
  
  if (range) {
    headers["Range"] = range;
  }

  try {
    const response = await fetch(videoUrl, {
      headers,
      // Cache the response inside the Next.js server cache
      cache: "force-cache",
    });

    const responseHeaders = new Headers();
    
    // Copy relevant headers from the Supabase response
    const copyHeaders = [
      "content-type",
      "content-length",
      "content-range",
      "accept-ranges",
    ];

    copyHeaders.forEach((header) => {
      const value = response.headers.get(header);
      if (value) responseHeaders.set(header, value);
    });

    // Override or set immutable long-term caching
    responseHeaders.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error fetching background video:", error);
    return NextResponse.redirect(videoUrl);
  }
}
