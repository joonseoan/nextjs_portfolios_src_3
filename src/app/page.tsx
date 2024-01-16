
// 2) Server Side Rendering with React Hooks
// Make a components folder and then make a react file
// import that file to this component
// We can use React in that file not this most parent component.
// So now this component is only for server side rendering
// and the second most parent is working for the client side rendering.

// Since we use React again in the second parent component,
// we can see "page.js" again in the network tab.

import Test from "@/components/Test";
import blogs from "@/contents/blogs.json";
import portfolios from "@/contents/portfolio.json";

// This page is going to be the default page for the project
export default function Home() {
  return (
    <>
      {/* <Test /> */}
      <div>
        {JSON.stringify(blogs)}
        {JSON.stringify(portfolios)}
      </div>
      <div>Hello World</div>
    </>
  )
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
