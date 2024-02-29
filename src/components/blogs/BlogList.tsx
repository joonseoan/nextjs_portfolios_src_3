'use client'

import Image from "next/image";
import { TestData } from "@/app/page";

// [SSR] with refreshing data
// import { getBlogs } from "@/utils/fetching.ssr";

// [Static] with html file. So whenever refresh the browser,
// the same data exists particularly in blogs
import { getBlogs } from "@/utils/fetching.static";
import { useEffect, useState } from "react";

// [IMPORTANT]
// 2) Client side data fetching
export function BlogList (

// 1) Only for server side and static page
// export async function BlogList (
  // work with `basic_concept`
  // { blogs }: { readonly blogs: TestData[] }
) {
  // ------------ [It works only with clients]!!!! -------
  /**
   * Client fetching
   * In the static page, what if we would like to fetch our data on the client?
   * For instance if we like to have `Javascript` rather than `HTML` from localhost:3000 (or 4000)
   * and then that javascript is responsible to create a HTML in the browser.
   * 
   * In this case, the initial loading of our page is faster because we do not need to render it
   * on the server, but instead we will get immediately javascript and the javascript will render
   * html.
   * 
   * 1) As long as we use React hooks, we must specify `use client` up and above
   * 2) We can't use async function for this component
   *
  */
  const [blogs, setBlogs] = useState<undefined | TestData[]>();
  // ----------------- Client Side Fetching -----------------------
  // [IMPORTANT]
  // Client Side Fetching by using local api.
  // It is always static page. (We can't setup no-cache in the local api) (Test with yarn run build and yarn run start)
  useEffect(() => {
    async function _getBlogs() {
      // Tomorrow === > API FETCH return typescript
      // Using local server. (Don't specify CORS in outside server)

      // TODO: We need a test using `fetching.ssr.ts`
      // to verify it supports dynamic data when we use client side fetching
      const response = await fetch('/api/blogs');
      const { data } = await response.json();
      setBlogs(data);
    }

    _getBlogs();
  }, []);
  
  // ------------ [It works with server for static and SSR page]!!!! -------
  // It is a parallel fetching now. (It takes 2 seconds to fetch blog and portfolio data)
  // In a while of 2 seconds, `portfolios` data is fetched in a second.
  // const { data: blogs } = await getBlogs();

  if (!blogs) {
    return <div>Loading....</div>;
  }

  const _blogs = blogs.map(({ id, title, description, coverImage }) => (
    <div key={id} className="content-item">
      <div className="content-item__image-container">
        {/* For Image, `next.config.js` should have configuration for the domain. */}
        <Image
          src={coverImage}
          alt={id}
          // [IMPORTANT]
          // 2) If we would like ti fill up the given size in the parent,
          fill={true}
          sizes="(max-width: 768px) 100vw, 33vw"
          
          // 1)
          // To decide the image size
          // width={100}
          // height={100}

          style={{ objectFit: "cover" }}

          // 1)
          // Deprecated
          // objectFit="cover"          
          // ======================
          
          // Deprecated
          // objectFit="cover"

          // When true, the image will be considered high priority and preload.
          // Lazy loading is automatically disabled for images using priority.
          priority={true}
        />
      </div>
      <div className="content-item__label">
        <div >{title}</div>
        <div>{description}</div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="content-section-title">Blogs</div>
      <div className="content-list">{_blogs}</div>
    </>
  );
}