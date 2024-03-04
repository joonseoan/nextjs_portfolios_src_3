'use client'

import { TestData } from '@/app/page';
// [SSR] with refreshing data
// import { getPortfolios } from '@/utils/fetching.ssr';

// [Static] with html file. So whenever refresh the browser,
// the same data exists
import { getPortfolios } from "@/utils/fetching.static";

// [Client Side Fetching]
import { useState, useEffect } from 'react';

import Image from 'next/image';
import portfolios from '@/contents/portfolio.json';

// [IMPORTANT]
// 2) Client side data fetching
export function PortfolioList (

// 1) only server side and static page
// export async function PortfolioList (
  // work with `basic concept`
  // { portfolios }: { readonly portfolios: TestData[] }
) {

  const [portfolios, setPortfolios] = useState<undefined | TestData[]>();
  
  // ----------------- Client Side Fetching ----------------------
  /**
   * [From Filip]
   * When you're using client-side fetching in Next.js with React's useEffect, 
   * the page is still considered a "static" page. However, the data fetched during client-side
   * rendering is indeed cached by the browser.
   * 
   * To ensure you're getting the latest data from the server, especially 
   * if it's dynamic and frequently updated, server-side rendering (SSR) or 
   * incremental static regeneration (ISR) are preferred methods in Next.js.
   * These approaches allow you to fetch fresh data on each request or 
   * at specified intervals,respectively.
   * 
   * If you're using client-side fetching on a static page and want to refresh
   * the data periodically, you can indeed use the revalidate option in Next.js.
   * This allows you to specify how often (in seconds) the page should be revalidated
   * and regenerated in the background.
   */
  useEffect(() => {
    async function _getPortfolios() {
      // Change it to using json file in local api like the one lecture.
      // API FETCH return typescript
      // Review
      // Client Side ...review

      // Static
      const response = await fetch('/api/portfolios');
      
      // Static
      // Static (But we must not call this if we want to make this page work as static)
      // because it is still static but the data is refreshed which means it is not manageable.
      // const response = await fetch('http://localhost:4000/api/portfolios');

      // Dynamic (SSR)
      // if we want to implement dynamic refreshed data, we should implement SSR as mentioned above.
      // In that case, we do not need to use `useEffect`

      const { data } = await response.json();
      setPortfolios(data);
    }

    _getPortfolios();
  }, []);

  if (!portfolios) {
    return <div>Loading...</div>
  }

  // 1)
  // ------------ [It works with server for static and SSR page]!!!! -------
  // It is a parallel fetching now. (It takes 2 seconds to fetch blog and portfolio data)
  // In a while of 2 seconds, `portfolios` data is fetched in a second.
  // const { portfolios: { data: portfolios} } = await getPortfolios();
  
  const _portfolios = portfolios.map(({ id, title, description, coverImage }) => (
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
          // ======================
          
          // 2)
          style={{ objectFit: "cover" }}

          // 1)
          // Deprecated
          // objectFit="cover"

          // When true, the image will be considered high priority and preload.
          // Lazy loading is automatically disabled for images using priority.
          priority={true}
        />
      </div>
      <div className="content-item__label">
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="content-section-title">Portfolios</div>
      <div className="content-list">{_portfolios}</div>
    </>
  );
}