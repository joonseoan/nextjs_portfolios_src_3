import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function PortfolioDetail({ params }: { params: Params }) {
  return (
    <>
      Blog Detail of: {params.slug}
    </>
  )
}