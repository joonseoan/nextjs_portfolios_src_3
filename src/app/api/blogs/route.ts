import { NextResponse } from "next/server";
import blogs from '@/contents/blogs.json';
import { delay } from "@/utils";

export async function GET() {
  console.log('Before delay in blogs')
  // It delays the browser's response, not data response in `localhost:3000/api/blogs`
  await delay(2000)
  console.log('After delay in blogs')
  return NextResponse.json({ data: blogs });
}