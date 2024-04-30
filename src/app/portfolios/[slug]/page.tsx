import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getPortfolioBySlug } from "@/utils/fetching.markdown";

export default function PortfolioDetail({ params }: { params: Params }) {
  const portfolio = getPortfolioBySlug(params.slug) as { title: string, description: string, content: string }

  return (
    <>
      <div>
        Portfolio Data: {portfolio.title}, {portfolio.description}
      </div>
      <hr />
      <div>
        {portfolio.content}
      </div>
    </>
  )
}