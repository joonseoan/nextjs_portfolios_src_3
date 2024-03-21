import { TestData } from "@/app/page";
import blogs from '@/contents/blogs.json';
import portfolios from '@/contents/portfolio.json';

export function getBlogs<T extends TestData[]>(): T {
  return blogs as T;
}

export function getPortfolios<T extends TestData[]>(): T {
  return portfolios as T;
}