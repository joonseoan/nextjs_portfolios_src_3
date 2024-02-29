'use client'

import { TestData } from '@/app/page';
// [SSR] with refreshing data
// import { getPortfolios } from '@/utils/fetching.ssr';
// [Static] with html file. So whenever refresh the browser,
// the same data exists
import { getPortfolios } from "@/utils/fetching.static";
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
  
  // ----------------- Client Side Fetching -----------------------
  // [IMPORTANT]
  // Client Side Fetching by using local api.
  // It is always static page. (We can't setup no-cache in the local api)
  useEffect(() => {
    async function _getPortfolios() {
      // Change it to using json file in local api
      // API FETCH return typescript
      // Review
      // Client Side ...review

      // TODO: We need a test using `fetching.ssr.ts`
      // to verify it supports dynamic data when we use client side fetching
      const response = await fetch('/api/portfolios');
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