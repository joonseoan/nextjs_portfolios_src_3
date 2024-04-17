import { NextResponse } from "next/server";
import blogs from '@/content/blogs.json';
import { delay } from "@/utils";
import { TestData } from "@/app/page";

// 2) Using the outside server
// We can call this in `use client` by using `useEffect`
// to avoid the CORS issue in the server.

// [IMPORTANT] As long as we use the client side fetching
// it is a static page even though we use `no-cache` in yarn run build and yarn run start 
// BTW, do not use `no-cache` yarn run dev. it updates the data. ---> It can confuse us.
// FYI, we can't use revalidate?  
export async function GET() {
  // [IMPORTANT!]
  // Like fetching in server side, it can be static and
  const res = await fetch('http://localhost:4000/api/blogs');
  
  if (!res.ok) {
    return NextResponse.json({ message: "Fetched Failed" }, { status: 400 });
  }

  return NextResponse.json(await res.json() as { data: TestData } );
}

// 1) Using json file
// export async function GET() {
//   console.log('Before delay in blogs')
//   // It delays the browser's response, not data response in `localhost:3000/api/blogs`
//   await delay(2000)
//   console.log('After delay in blogs')
//   return NextResponse.json({ data: blogs });
// }