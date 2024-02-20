import { TestData } from "@/app/page";
import { delay } from ".";

export async function getBlogs(): Promise<{ data: TestData[] }> {
  await delay(2000);
  const res = await fetch('http://localhost:4000/api/blogs', { cache: 'no-cache' });

  if (!res.ok) {
    throw new Error('Unable to get blogs');
  }

  return res.json();
}

export async function getPortfolios(): Promise<{ portfolios: { data: TestData[] }, random: number }> {
  await delay(1000);
  const random = Math.random()

  const res = await fetch('http://localhost:4000/api/portfolios', { cache: 'no-cache' });

  if (!res.ok) {
    throw new Error('Unable to get Portfolios');
  }

  return { portfolios: await res.json(), random };
}