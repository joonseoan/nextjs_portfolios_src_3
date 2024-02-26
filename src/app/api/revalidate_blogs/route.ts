import { NextRequest, NextResponse } from "next/server";
// import blogs from '@/contents/blogs.json';
// import { delay } from "@/utils";

import { revalidateTag } from "next/cache";
// Test WITH THIS
// https://nextjs.org/docs/app/api-reference/functions/revalidateTag



// For `revalidate` we will use POST.
// `secret` is for authorization. For instance, only admin can revalidate the page.
// http://localhost:3000/api/revalidate_blogs?tag=blogs&secret=afafdafdad
// 
export async function POST(request: NextRequest) {
  // [IMPORTANT]
  // The way to get params in nextjs
  // http://localhost:3000/api/revalidate_blogs?tag=blogs&secret=afafafa
  const nextURL = request.nextUrl
  console.log('nextURL: ', nextURL)
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