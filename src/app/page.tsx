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

import Test from "@/components/Test";
// Using json file
// import blogs from "@/contents/blogs.json";
// import portfolios from "@/contents/portfolio.json";
import { BlogList } from "@/components/blogs/BlogList";
import { PortfolioList } from "@/components/portfolios/PortfolioList";

export interface TestData {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
};

/**
 * In the previous version, we need to use `getStaticProps`
 * or `getServerSideProps` in order to get api data
 * in the server side rending but in the latest version,
 * we can simply build any function.
 */

// [IMPORTANT!!!!!]
// Even though the server in API folder has 1 or 2 second delay (settimeout),
// the client does not have the delay for getting the data in ****** production.
// This is happening because API folder and this `page` are in the same localhost:3000
// and then this data are getting pre-rendered on the server at the build time
// before requesting `page` from the browser.
// Please, make sure that all server side pages are pre rendered in the serve *** at the build time ***
// before the client requests `localhost:3000`.
// Add console.log in `getBlogs()` function and `yarn run build`
// Then we will figure out the fetching data happens in the build time.
// and then cached in the browser. If the data is not cached, it will generate the build error.
// --------------> Why? The function is called in that API build time!!!! 
// FYI, please make sure that the function inside api folder does not work in build time.
// This is a *** server side rendering ***.
// TODO:
// 1) Let's think about static rendering contains only html file.
// 2) Also we can use useEffect for the client side rendering
async function getBlogs(): Promise<{ data: TestData[] }> {
  console.log('Fetching Blogs')
  // In refreshing with {cache: 'no-cache'}, it will take a delay to render the page.
  const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-cache' });
  console.log('Getting Blogs')
  if (!res.ok) {
    throw new Error('Unable to get blogs');
  }

  return res.json();
}

async function getPortfolios(): Promise<{ data: TestData[] }> {
  console.log('Fetching Portfolios')
  const res = await fetch('http://localhost:3000/api/portfolios', { cache: 'no-cache' });
  console.log('Getting Portfolios')
  if (!res.ok) {
    throw new Error('Unable to get Portfolios');
  }

  return res.json();
}

// This page is going to be the default page for the project
export default async function Home() {
  const { data: blogs } = await getBlogs();
  const { data: portfolios } = await getPortfolios();

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
import Portfolios from './portfolios/page';

// // This page is going to be the default page for the project
// export default function Home() {
//   useEffect(() => {
//     console.log("abc")
//   }, []);

//   return (
//     <div>Hello World</div>
//   )
// }
