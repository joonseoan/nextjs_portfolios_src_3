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


/**
 * [Build Stage] ---> Not in the server
 * For this page (in Server Side Rendering), we will not render any HTML document.
 * We will create a Javascript file. The javascript functions
 * including functions fetching data and rendering the page
 * will generate HTML document with Virtual DOM
 * 
 * For `Blogs` and `Portfolio` page, it just generates HTML.
 * 
 * [Running Stage]
 * The browser requests `/blogs` in the server. In that server, Javascript function (router)
 * is responsible for getting `/blogs` page. At the moment Javascript function (router) getting
 * the `/blog` page, HTML is already prepared because it is generated in the build time.
 * (Please find the static page above)
 * Then it gets `/blog` page back to the browser.
 * 
 * However, for this page, it is a little bit different. The Javascript function (router)
 * tries to get '/' page but the HTML document in the server is not prepared. The router function
 * requests the page, it starts preparing HTML and the handler function responsible fetching data and rendering the page
 * starts running and then generates the HTML page.
 *  
 * 
 * 
 * 
 */

/**  
  [IMPORTANT!!!!!]
  Even though the function `GET` function in the server has 1 or 2 second delay (settimeout),
  the client does not have the delay for getting the data.
  This is happening because API folder and this `page` are in the same localhost:3000
  and then this data are getting pre-rendered on the server at the build time.

  Add console.log in `getBlogs()` function and `yarn run build`
  Then we can see the fetching data happens in the build time.
  and then `cached` in the browser. 
  If the data is not cached, it will generate the build error.
  The function is called but the fetching and response does not work!!!!
  For example, run yarn run build with await fetch('http://localhost:3000/api/blogs')
  We cannot see `AfterDelay`, and `Getting Blogs`
 */

// We can't use React Hooks in this main `page` with former `getStaticProps` or `getServerSideProps`.
async function getBlogs(): Promise<{ data: TestData[] }> {
  console.log('Fetching Blogs')

  // Since setting up the separate backend, it works in the build time.
  const res = await fetch('http://localhost:3000/api/blogs');

  /**
   * [IMPORTANT!!!]
   * With { cache: defaultValue }, As mentioned above, the data is cached in the browser. 
   * Therefore, there is no error in build time because the API function does not sending the data.
   * (The function is called BTW)
   * 
   * In other word, with { cache: 'no-cache' }, it works lik a server side rendering page
   * with `getServerSideProps` which means it should response with data. 
   * In this case, it does not work time and generates error in the build!
   * So the server must be outside this app
   * to resolve this issue that can maintain static props data page with getStaticProps
   * with any options { cache: 'any options' }
   * 
   * BTW, however it works in the running time because the data is not cached. So we can find 
   * the delay to fetch the data in the running time.
   */
  // const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-cache' });
  // console.log('Getting Blogs')
  if (!res.ok) {
    throw new Error('Unable to get blogs');
  }

  return res.json();
}

async function getPortfolios(): Promise<{ data: TestData[] }> {
  console.log('Fetching Portfolios')
  // Since setting up the backend, it works in the build time
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
