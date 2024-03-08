import { TestData } from "@/app/page";
import blogs from '@/contents/blogs.json';
import portfolios from '@/contents/portfolio.json';

export function getBlogs<T>(): T {
  // const res = await fetch('http://localhost:4000/api/blogs');

  // if (!res.ok) {
  //   throw new Error('Unable to get blogs');
  // }

  return blogs as T;
}

export function getPortfolios<T>(): T {
  
  // const res = await fetch('http://localhost:4000/api/portfolios');

  // if (!res.ok) {
  //   throw new Error('Unable to get Portfolios');
  // }

  return portfolios as T;
}