import Image from 'next/image';
import { TestData } from '@/app/page';
import { getPortfolios } from '@/utils/fetching.markdown';

export function PortfolioList () {
  const portfolios = getPortfolios();
  
  const portfolioMarkdown = portfolios.map((markdown) => {
    return <div key={markdown}>{markdown}</div>
  });
  
  return (
    <>
      <div className="content-section-title">Portfolios</div>
      {portfolioMarkdown}
      <div className="content-list"></div>
    </>
  );
}