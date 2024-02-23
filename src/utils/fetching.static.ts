import { TestData } from "@/app/page";
import { delay } from ".";

export async function getBlogs(): Promise<{ data: TestData[] }> {
  await delay(2000);
  // Revalidate by utilizing tag
  const res = await fetch('http://localhost:4000/api/blogs', {
    // method: 'POST',
     /** ------- 2. Demand base revalidate --------- */
    // step 1) Add tags to fetch function
    // step 2) Need to create a separate endpoint only for `revalidate`.
    // We can add anything in the array as string
    // next: { tags: ['blogs'] } 
  });

  // How to make the static page have the updated data from API?
  // Use next and its `revalidate` option with the interval 2 seconds for instance.
  // It should work with `yarn run build` and then `yarn run start`.
  // (delete `next` folder before `yarn run build`)
  // const res = await fetch('http://localhost:4000/api/blogs', {
    
    // [IMPORTANT]
    // The SSR and Revalidate do not work together!!!
    // cache: 'no-cache', next: { revalidate: 2 }

    /** ------- 1. Time base revalidate --------- */

    // 2) also we can use it in the component.
    // Please visit `/` page and then find `export const revalidate = 2;`

    // 1) we use revalidate in fetch function.
    // next: { revalidate: 2 /** second */ }
  // });

  if (!res.ok) {
    throw new Error('Unable to get blogs');
  }

  return res.json();
}

export async function getPortfolios(): Promise<{ portfolios: { data: TestData[] }, random: number }> {
  await delay(1000);
  const random = Math.random()

  const res = await fetch('http://localhost:4000/api/portfolios');

  if (!res.ok) {
    throw new Error('Unable to get Portfolios');
  }

  return { portfolios: await res.json(), random };
}