// [IMPORTANT]
// must not use for SSR and static
// 'use client'

import Image from 'next/image';
import { TestData } from '@/app/page';
import { getPortfolios } from "@/utils/fetching.static";
import { getPortfolios as getPortfolios2 } from '@/utils/fetching.json.content';

export async function PortfolioList () {
  const { portfolios: { data: portfolios } } = await getPortfolios<
    { portfolios: { data: TestData[] }, random: number }
  >();
  
  const _portfolios = portfolios.map(({ id, title, description, coverImage }) => (
    <div key={id} className="content-item">
      <div className="content-item__image-container">
        <Image
          src={coverImage}
          alt={id}
          fill={true}
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
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