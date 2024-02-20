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
import { delay } from "@/utils";
import { Suspense } from "react";

export interface TestData {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
};

// This page is going to be the default page for the project
export default async function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading Blogs</div>}>
        <BlogList />
      </Suspense>
      <Suspense fallback={<div>Loading Portfolios</div>}>
        <PortfolioList />
      </Suspense>
    </>
  );
}
