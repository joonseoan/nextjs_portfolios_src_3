// [IMPORTANT]
// must not use for SSR and static
// 'use client'

import Image from "next/image";
import { TestData } from "@/app/page";
import { getBlogs } from "@/utils/fetching.json.content";

export function BlogList () {
  const blogs = getBlogs<TestData[]>();

  const _blogs = blogs.map(({ id, title, description, coverImage }) => (
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
        <div >{title}</div>
        <div>{description}</div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="content-section-title">Blogs</div>
      <div className="content-list">{_blogs}</div>
    </>
  );
}