import { NextRequest, NextResponse } from "next/server";
// import blogs from '@/contents/blogs.json';
// import { delay } from "@/utils";


// For `revalidate` we will use POST.
// `secret` is for authorization. For instance, only admin can revalidate the page.
// http://localhost:3000/api/revalidate_blogs?tag=blogs&secret=afafdafdad
export async function POST(request: NextRequest) {
  return NextResponse.json({ data: 'should work' });
}