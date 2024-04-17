import { NextResponse } from "next/server";
import portfolios from '@/content/portfolio.json';
import { delay } from "@/utils";

// [IMPORTANT] As long as we use the client side fetching
// it is a static page even though we use `no-cache` in yarn run build and yarn run start 
// BTW, do not use `no-cache` yarn run dev. it updates the data. ---> It can confuse us.
// FYI, we can't use revalidate?  
export async function GET() {
  // [IMPORTANT] As long as we use the client side fetching
  const res = await fetch('http://localhost:4000/api/portfolios');
    if (!res.ok) {
      return NextResponse.json({ message: "Fetched Failed" }, { status: 400 });
    }
  
    return NextResponse.json(await res.json());
}

// 1) Using json file
// export async function GET() {
//     // It delays the browser's response, not data response in `localhost:3000/api/portfolios`
//   console.log('Before delay in portfolios')
//   await delay(1000)
//   console.log('After delay in portfolios')
//   return NextResponse.json({ data: portfolios });
// }