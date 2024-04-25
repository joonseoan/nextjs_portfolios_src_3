import Image from 'next/image';
import { TestData } from '@/app/page';
import { getPortfolios } from '@/utils/fetching.markdown';

export function PortfolioList () {
  const portfolios = getPortfolios();
  
  const portfoliosMarkdown = portfolios.map(({ data, content }) => {
    const { title, description, coverImage, id } = data;
    return <div key={id} className="content-item">
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
        <p>{content}</p>
      </div>
    </div>
  });
  
  return (
    <>
      <div className="content-section-title">Portfolios</div>
      <div className="content-list">{portfoliosMarkdown}</div>
    </>
  );
}