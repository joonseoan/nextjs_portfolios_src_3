// [IMPORTANT] 'use server' should be used only for the server!!,
// not for the server side rendering
// 'use server'

// 2) Server Side Rendering with React Hooks
// Make a `components` folder and then make a react file.
// import that file to this component
// We can use React in that file not this most parent component.
// So now this component is only for server side rendering
// and the second most parent is working for the client side rendering.

// Since we use React again in the second parent component,
// we can see "page.js" again in the network tab which means
// the client with HTML is retrieved from the server.

export interface TestData {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
}

import Test from "@/components/Test";
// Using json file
// import blogs from "@/contents/blogs.json";
import portfolios from "@/contents/portfolio.json";
import Image from "next/image";
import { BlogList } from "@/components/blogs/BlogList";
import { PortfolioList } from "@/components/portfolios/PortfolioList";

/**
 * In the previous version, we need to use `getStaticProps`
 * or `getServerSideProps` in order to get api data
 * in the server side rending but in the latest version,
 * we can simple build any function.
 */

async function getBlogs(): Promise<{ data: TestData[] }> {
  console.log('Fetching Blogs')
  const res = await fetch('http://localhost:3000/api/blogs');
  console.log('Getting Blogs')
  if (!res.ok) {
    throw new Error('Unable to get blogs');
  }

  return res.json();
}


// This page is going to be the default page for the project
export default async function Home() {
  // [IMPORTANT!!!!!]
  // Even though the server has 1 or 2 second delay (settimeout),
  // the client does not have the delay for the data.
  // This is happening because this data are getting pre-rendered on the server at the build time.
  // Please, make sure that all pages are pre rendered in the serve *** at the build time ***
  // before the client requests `localhost:3000`.
  // Add console.log above in `getBlogs()` function and `yarn run build`
  const { data: blogs } = await getBlogs();

  return (
    <>
      <BlogList blogs={blogs} />
      <PortfolioList portfolios={portfolios} />
    </>
  );
}

// 1) Client side rendering
// [IMPORTANT]
// We need to specify that this page will be used in the client side rendering.
// Then, we can use React.
// This tag must be the most parent component.
// "use client" // it creates a `page.js` request in browser's network tab 

// import { useEffect } from "react"

// // This page is going to be the default page for the project
// export default function Home() {
//   useEffect(() => {
//     console.log("abc")
//   }, []);

//   return (
//     <div>Hello World</div>
//   )
// }
