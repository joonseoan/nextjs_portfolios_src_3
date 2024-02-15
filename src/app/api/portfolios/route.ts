import { NextResponse } from "next/server";
import portfolios from '@/contents/portfolio.json';
import { delay } from "@/utils";

export async function GET() {
    // It delays the browser's response, not data response in `localhost:3000/api/portfolios`
  console.log('Before delay in portfolios')
  await delay(1000)
  console.log('After delay in portfolios')
  return NextResponse.json({ data: portfolios });
}