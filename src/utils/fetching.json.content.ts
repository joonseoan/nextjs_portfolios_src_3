import { TestData } from "@/app/page";
import blogs from '@/content/blogs.json';
import portfolios from '@/content/portfolio.json';

export function getBlogs<T extends TestData[]>(): T {
  return blogs as T;
}

export function getPortfolios<T extends TestData[]>(): T {
  return portfolios as T;
}