import Image from "next/image";
import { TestData } from "@/app/page";
import { getBlogs } from "@/utils/fetching.markdown";

export function BlogList () {
  const blogs = getBlogs();

  const blogsMarkdown = blogs.map((markdown) => {
    return <div key={markdown}>{markdown}</div>
  });

  return (
    <>
      <div className="content-section-title">Blogs</div>
      {blogsMarkdown}
      <div className="content-list"></div>
    </>
  );
}