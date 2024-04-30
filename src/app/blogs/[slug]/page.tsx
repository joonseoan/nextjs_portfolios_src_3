import { getBlogBySlug } from "@/utils/fetching.markdown";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// It is a server side rendering even though the parent is static
// because Next.js does not know what page we want to navigate to.
// So that is why we need to render the HTML at the server time.

export default function BlogDetail({ params }: { params: Params }) {
  const blog = getBlogBySlug(params.slug) as { title: string, description: string, content: string }

  return (
    <>
      <div>
        Blog Data: {blog.title}, {blog.description}
      </div>
      <hr />
      <div>
        {blog.content}
      </div>
    </>
  )
}