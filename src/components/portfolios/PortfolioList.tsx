import { TestData } from '@/app/page';
import Image from 'next/image';

export function PortfolioList ({ portfolios }: { readonly portfolios: TestData[] }) {
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