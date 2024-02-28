import { NextResponse } from "next/server";
import blogs from '@/contents/blogs.json';
import { delay } from "@/utils";

// 2) Using the outside server
export async function GET() {
  const res = await fetch('http://localhost:4000/api/blogs');
  
    if (!res.ok) {
      return Response.json({ message: "Fetched Failed" }, { status: 400 });
    }
  
    return Response.json(await res.json());
}


// 1) Using json file
// export async function GET() {
//   console.log('Before delay in blogs')
//   // It delays the browser's response, not data response in `localhost:3000/api/blogs`
//   await delay(2000)
//   console.log('After delay in blogs')
//   return NextResponse.json({ data: blogs });
// }