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
import { delay } from "@/utils";


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
 * we can simply build any function with `fetch`'s { cache: no-cache } (for server side rendering)
 * and fetch's default cache { cache: defaultValue } (for static rendering)
 */

/***
 * IMPORTANT.
 * Before we understand and test the static and server side rendering
 * We must enable cache in the network tab of the chrome browser.
 * Static works only in `enable cache` setup
 */

/**
 * [Build Stage] ---> Not in the server
 * For the pages other than this page (`/`), HTML page is created and then rendered.
 * For `Blogs` and `Portfolio` page, it just generates HTML.
 * 
 * However, for this page (`/` in Server Side Rendering), we will not render any HTML document.
 * We will create a Javascript file. The handler functions fetching data and rendering the page
 * will generate HTML document with Virtual DOM when it requested. (Slower but it can get the refreshed data)
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
 * requests the page, it starts preparing HTML and the handler functions (functions fetching api data
 * and rendering Virtual DOM) starts running and then generates the HTML page. After the HTML document
 * is created, the server will send it to the browser.
 */

/**  
  [IMPORTANT!!!!!]
  Even though the function `GET` function in the server has 1 or 2 second delay (settimeout),
  the client does not have the delay for getting the data. This is happening because 
   - { cache: defaultValue } in `fetch` cached the data in the browser. 
  Then this HTML created by Virtual DOM is getting pre-rendered on the server in the build time.

  Add console.log in `getBlogs()` function and `yarn run build`.
  Then we can see the fetching data happens in the build time.
  and then `cached` in the browser. 
  
  If the data is not cached, it will generate the build error.
  The function is called but the fetching and response does not work!!!!
  For example, run yarn run build with await fetch('http://localhost:3000/api/blogs')
  We cannot see `AfterDelay`, and `Getting Blogs`
 */

// We can't use React Hooks in this main `page` with former `getStaticProps` or `getServerSideProps`.
async function getBlogs(): Promise<{ data: TestData[] }> {
  await delay(2000);
  console.log('Fetching Blogs')
  
  // [IMPORTANT] 
  // For both static and ssr, the call of `fetch` api function does not happen in the browser.
  // For instance, we can't find fetch in the network tab of the browser.

  // 1) [SSR]
  // Since setting up the separate backend, it works in the build time.
  const res = await fetch('http://localhost:4000/api/blogs', { cache: 'no-cache' });
  // It does not work at build time. Instead, it works in the `server` in the running time.
  // const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-cache' });
  
  // 2) [Static].
  // It works in the build time, not running time.
  // const res = await fetch('http://localhost:4000/api/blogs');
  // const res = await fetch('http://localhost:3000/api/blogs');

  /**
   * [IMPORTANT!!!]
   * With { cache: defaultValue }, As mentioned above, the data is fetched in build time.
   * The the data is cached in the browser. And then
   * it prepares HTML in the build time. Therefore it is `Static rendering` that HTML is prepared.
   * However, it can't refresh the data.
   * 
   * On the other hand, with { cache: 'no-cache' }, it works in a way of a `server side rendering`.
   * The page works like the one with `getServerSideProps`.
   * In this case, it does not work and generate an error in the build! 
   * 
   * BTW, however it works in the running time stage because BE server is running . So we can find 
   * the delay to fetch the data in the running time.
   */

  // const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-cache' });
  console.log('Getting Blogs')
  if (!res.ok) {
    throw new Error('Unable to get blogs');
  }

  return res.json();
}

/**
 * [Testing server side rendering and static rendering] ---- Important!!!!
 * [Must enable cache in the network tab of the browser!!! particularly for static mode]
 * 1. Delete { cache: 'no-cache' } or Create { cache: 'no-cache' } again.
 * 2. Whenever delete or create { cache: 'no-cache' }, run `npm run build`.
 * 3. After finish the build, please check out if there is `server-side-rendering` mark.
 *    with { cache: 'no-cache'} it should display the server side rendering mark. Otherwise,
 *    it should show us all static marks 
 * 3. Then verify the random number is switching after `npm run start`, not `npm run dev`!!!!
 *    [IMPORTANT] npm run dev is for development but `npm run start` for running build!!
 * 4. If it is switching, it is `server-side rendering`, otherwise it is `static-rendering`
 */
async function getPortfolios(): Promise<{ portfolios: { data: TestData[] }, random: number }> {
  await delay(1000);
  const random = Math.random()

  console.log('Fetching Portfolios')
  // Since setting up the backend, it works in the build time
  const res = await fetch('http://localhost:4000/api/portfolios', { cache: 'no-cache' });

  // 2) server side rendering. The local server does not work in build time!!
  // const res = await fetch('http://localhost:3000/api/portfolios', { cache: 'no-cache' });

  // 1) static
  // const res = await fetch('http://localhost:3000/api/portfolios');

  console.log('Getting Portfolios')
  if (!res.ok) {
    throw new Error('Unable to get Portfolios');
  }

  return { portfolios: await res.json(), random };
}

// This page is going to be the default page for the project
export default async function Home() {
  /**
   * [Parallel]
   * We can optimize it with parallel fetching by using `Promise.all`. 
   * For instance, `getBlogs` 2 seconds which is longer than `getPortfolios` (1 second).
   * Thus, it can take 2 seconds in max, not 3 seconds in total.
   */
  const [
    { data: blogs },
    { portfolios: { data: _portfolios }, random }
  ] = await Promise.all(
    [getBlogs(), getPortfolios()]
  );

  /**
   * [Sequential fetching]
   * The data fetching occurs in sequence: blogs first (2 seconds) and portfolios next (1 second).
   * Thus, it takes 3 seconds in total.
   */
  // const { data: blogs } = await getBlogs(); // 
  // const { portfolios: { data: _portfolios }, random } = await getPortfolios();

  return (
    <>
      <h1>{random}</h1>
      <BlogList 
        // blogs={blogs} 
      />
      <PortfolioList
        // portfolios={_portfolios} 
      />
    </>
  );
}

// 1) Client side rendering
// [IMPORTANT]
// We need to specify that this page will be used in the client side rendering.
// Then, we can use React.
// This tag must be the most parent component of the client side rendering.
// "use client" // it creates a `page.js` request in browser's network tab 

// import { useEffect } from "react"
// import Portfolios from './portfolios/page';
// import { delay } from "@/utils";

// // This page is going to be the default page for the project
// export default function Home() {
//   useEffect(() => {
//     console.log("abc")
//   }, []);

//   return (
//     <div>Hello World</div>
//   )
// }
