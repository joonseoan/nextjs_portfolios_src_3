import { NextResponse } from "next/server";
import portfolios from '@/contents/portfolio.json';
import { delay } from "@/utils";

export async function GET() {
    // It delays the browser's response, not data response in `localhost:3000/api/portfolios`
  await delay(1000)
  return NextResponse.json({ data: portfolios });
}