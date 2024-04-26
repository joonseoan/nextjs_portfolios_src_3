import Image from "next/image";
import { TestData } from "@/app/page";
import { getBlogs } from "@/utils/fetching.markdown";
import Link from "next/link";

export function BlogList () {
  const blogs = getBlogs();

  const blogsMarkdown = blogs.map(({ data, content }) => {
    const { title, description, coverImage, id, path } = data;
    return <div key={path} className="content-item">
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
      <Link href={`/blogs/${path}`}>See More</Link>
    </div>
  });

  return (
    <>
      <div className="content-section-title">Blogs</div>
      <div className="content-list">{blogsMarkdown}</div>
    </>
  );
}