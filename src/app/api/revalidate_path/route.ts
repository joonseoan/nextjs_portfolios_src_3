import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * 
 *  [Revalidate Path]
 *  
 */

// For `revalidate path`, we will use POST.
// And also we need to provide the page url instead of tag. In this case, we use home page, '/'
// `secret` is for authorization. For instance, only admin can revalidate the page.
// http://localhost:3000/api/revalidate_path?path=/&secret=abcde
// Please, use the same tab in the browser
 
export async function POST(request: NextRequest) {
  console.log('Revalidate Path works!!!')
  const path = request.nextUrl.searchParams.get('path');
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: 'Invalid Request' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
  }

  // Uses `revalidatePath`
  revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}