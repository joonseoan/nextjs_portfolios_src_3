// [IMPORTANT]
// must not use for SSR and static
// 'use client'

import Image from "next/image";
import { TestData } from "@/app/page";
import { getBlogs } from "@/utils/fetching.markdown";

export function BlogList () {
  const blogs = getBlogs();

  return (
    <>
      <div className="content-section-title">Blogs</div>
      <div className="content-list">blog markdown</div>
    </>
  );
}