'use client'

import Image from "next/image";
import { TestData } from "@/app/page";
import { getBlogs } from "@/utils/fetching.static";
import { getBlogs as getBlogs2 } from "@/utils/fetching.json.content";
import { useEffect, useState } from "react";
import { metadata } from '../../app/layout';

export function BlogList () {
  const blogs = getBlogs2<TestData[]>();

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