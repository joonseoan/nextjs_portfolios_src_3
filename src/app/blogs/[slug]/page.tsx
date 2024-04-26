import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function BlogDetail({ params }: { params: Params }) {
  return (
    <>
      Blog Detail of: {params.slug}
    </>
  )
}