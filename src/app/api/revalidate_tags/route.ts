import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * 
 *  [Revalidate Tag]
 *  
 */

// https://nextjs.org/docs/app/api-reference/functions/revalidateTag

// For `revalidate tag`, we will use POST.
// `secret` is for authorization. For instance, only admin can revalidate the page.
// http://localhost:3000/api/revalidate_tags?tag=blogs&secret=abcde
 
export async function POST(request: NextRequest) {
  // [IMPORTANT]
  // The way to get query in nextjs
  // http://localhost:3000/api/revalidate_tags?tag=blogs&secret=abcde
  const tag = request.nextUrl.searchParams.get('tag');
  console.log('tag: ', tag)
  const secret = request.nextUrl.searchParams.get('secret');
  console.log('secret: ', secret)

  if (tag) {
    revalidateTag(tag);
  } else if (!(tag && secret)) {
    return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
  }

  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: 'Invalid Request' }, { status: 401 });
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}