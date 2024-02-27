import { TestData } from "@/app/page";
import { delay } from ".";

const data = new URLSearchParams();
data.append('tag', 'blogs');
data.append('secret', 'whatisgoingon');

// `revalidateTag` allows us to purge cached data on-demand for a specific cache tag.
/**
 * Good to know:
 *  revalidateTag is available in both Node.js and Edge runtimes.
 * 
 *  `revalidateTag` only invalidates the cache when the path is next visited. 
 *  This means calling `revalidateTag` with a dynamic route segment will not
 *  immediately trigger many `revalidations` at once.
 *  The invalidation only happens when the path is next visited.
 */


export async function getBlogs(): Promise<{ data: TestData[] }> {
  await delay(2000);
  // Revalidate by utilizing tag
  const res = await fetch('http://localhost:4000/api/blogs', {
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

    /** ------- 2. Tag base revalidate --------- */
    // 1) Register any tags here for the fetch.
    // 2) Create local api for `revalidate_blogs`. Please find revalidate_blogs file. (Must be local)
    // 3) await fetch('http://localhost:3000/api/revalidate_blogs?tag=blogs&secret=abcde', {method: 'POST'})
    //  Please use the browser console in the tab which is not in project.
    //  And refresh the browser tab which contains the project
    //  We can see the data is updated.
    
    //  Hence, this static page only updates data once
    // only after running await fetch('http://localhost:3000/api/revalidate_blogs?tag=blogs&secret=abcde', {method: 'POST'})   
    //  Therefore, tag-demand should work with Admin role, etc.
    next: { tags: ['blogs'] },
  });

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