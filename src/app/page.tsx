// [IMPORTANT] 'use server' should be used only for the server!!,
// not for the server side rendering
// 'use server'

// 2) Server Side Rendering with React Hooks
// Make a `components` folder and then make a React file.
// import that file to this component
// We can use React in that file not this most parent component.
// So now this component is only for server side rendering
// and the second most parent is working for the client side rendering.

// Since we use React again in the second parent component,
// we can see "page.js" again in the network tab which means
// the client with HTML is retrieved from the server.

import { BlogList } from "@/components/blogs/BlogList";
import { PortfolioList } from "@/components/portfolios/PortfolioList";
import { BlogList as BlogList2 } from "@/components/blogs/BlogList2";
import { PortfolioList as PortfolioList2 } from "@/components/portfolios/PortfolioList2";
import { BlogList as BlogList3 } from "@/components/blogs/BlogList3";
import { PortfolioList as PortfolioList3 } from '@/components/portfolios/PortfolioList3';
import { delay } from "@/utils";
import { Suspense } from "react";

export interface TestData {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
};

/** ------- 1. Time base revalidate for static page --------- */

// The second way to revalidate the static page.
// Without the `revalidate` option in fetch function,
// we can use `revalidate` in the component.
// Test `yarn run build` and `yarn run start`
// [IMPORTANT!]
// So every interval, the server generates a **** new HTML page **** in the running time
// and sent to the client again
// even though the first HTML is generated in the build time.
// export const revalidate = 2;

export default async function Home() {
  // [Client-side-rendering vs Server-side-rendering]
  // return (
  //   <>
  //     {/* [IMPORTANT] Since it is a client side fetching, we do not need to use Suspense */}
  //     {/* <Suspense fallback={<div>Loading Blogs</div>}>  */}
  //     {/* Using local json */}
  //       <BlogList />
  //     {/* </Suspense> */}
  //     {/* <Suspense fallback={<div>Loading Portfolios</div>}> */}
  //       <PortfolioList />
  //     {/* </Suspense> */}
  //   </>
  // );

  // 2)
  // [Static]
  // [if Static-Revalidation]
  // return (
  //   <>
  //     <Suspense fallback={<div>Loading Blogs</div>}> 
  //       <BlogList2 />
  //     </Suspense>
  //     <Suspense fallback={<div>Loading Portfolios</div>}>
  //       <PortfolioList2 />
  //     </Suspense>
  //   </>
  // );

  // 3)
  // [Static]
  // Fetching Json
  return (
    <>
      <Suspense fallback={<div>Loading Blogs</div>}> 
        <BlogList3 />
      </Suspense>
      <Suspense fallback={<div>Loading Portfolios</div>}>
        <PortfolioList3 />
      </Suspense>
    </>
  );
}
