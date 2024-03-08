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

// This page is going to be the default page for the project
export default async function Home() {
  return (
    <>
      {/* Since it is a client fetching, we do not need to use Suspense */}
      {/* <Suspense fallback={<div>Loading Blogs</div>}> */} 
      {/* Using local json */}
      <BlogList2 />
      {/* </Suspense> */}
      {/* <Suspense fallback={<div>Loading Portfolios</div>}> */}
      <PortfolioList2 />
      {/* </Suspense> */}
    </>
  );
}
