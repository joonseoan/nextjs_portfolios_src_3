import { TestData } from "@/app/page";
import { delay } from ".";

export async function getBlogs<T extends { data: TestData[] }>(): Promise<T> {
  await delay(2000);
  // Revalidate by utilizing tag
  const res = await fetch('http://localhost:4000/api/blogs', {
  // How to make the static page have the updated data from API?
  // Use next and its `revalidate` option with the interval 2 seconds for instance.
  // It should work with `yarn run build` and then `yarn run start`.
  // (delete `next` folder before `yarn run build`)
  // const res = await fetch('http://localhost:4000/api/blogs', {
    
    // [IMPORTANT][FYI]
    // The SSR and Revalidate do not work together!!!
    // cache: 'no-cache', next: { revalidate: 2 }

    /** ------- 1. Time base revalidate --------- */

    // 2) also we can use it in the component.
    // Please visit `/` page and then find `export const revalidate = 2;`

    // 1) we use revalidate in fetch function.
    // BTW we do not need to build local API like in `Tag and Path` revalidation
    // next: { revalidate: 2 /** second */ }

    /** ------- 2. Tag base revalidate --------- */
    // 1) Register any tags here for the fetch.
    // 2) Create local api for `revalidate_blogs`. Please find revalidate_blogs file. (Must be local)
    // 3) Don't forget npm run build and npm run start before the next step
    // 4) await fetch('http://localhost:3000/api/revalidate_tags?tag=blogs&secret=abcde', {method: 'POST'})
    //  Please use the browser console in the tab that contains the project. Do not use another tab!
    //  And refresh the browser tab which contains the project
    //  We can see the data is updated.
    
    // Hence, this static page only updates data
    // once only after running await fetch('http://localhost:3000/api/revalidate_tags?tag=blogs&secret=abcde', {method: 'POST'}) 
    // [IMPORTANT]
    // Therefore, tag-demand should work with Admin role, etc. We can create another Admin app
    // and we can call this fetch function with `secret`
    // or otherwise we can call this function from the button in this app without `secret`.

    /**
     * Good to know:
     *  `revalidateTag` allows us to purge cached data on-demand for a specific cache tag.
     *  revalidateTag is available in both Node.js and Edge runtimes.
     * 
     *  `revalidateTag` only invalidates the cache when the this path
     *   (which specifically calls this `getBlogs` function ) is visited. 
     *  This means calling `revalidateTag` with a dynamic route segment will not
     *  immediately trigger many `revalidations` at once.
     *  The invalidation only happens when the path is next visited.
     */
    // next: { tags: ['blogs'] },

     /** ------- 3. Path base revalidate --------- */
    //  We do not need to specify anything like those in revalidate tag and time
    // 1) setup local api for revalidate_path. For instance, `api/revalidate_path`
    // 2) In the browser, we can test it with a fetch function. (Must use the same tab as well)
    //    (Please, use the same tab in the browser
    //    let res = await fetch('http://localhost:3000/api/revalidate_path?path=/blogs&secret=abcde', { method: 'POST' })

    /**
     * Tag vs Path
     * 
     * We can set `tags` for the multiple pages using {tags: [ blogs, ....]}
     * However, `path` works for only a single page / path
     */
  });

  if (!res.ok) {
    throw new Error('Unable to get blogs');
  }

  return res.json();
}

export async function getPortfolios<T extends { portfolios: { data: TestData[] }, random: number }>(): Promise<T> {
  await delay(1000);
  const random = Math.random()

  const res = await fetch('http://localhost:4000/api/portfolios', {
    // next: { revalidate: 2 }
  });

  if (!res.ok) {
    throw new Error('Unable to get Portfolios');
  }

  return ({ portfolios: await res.json(), random }) as T;
}