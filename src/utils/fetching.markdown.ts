import path from 'path';
import fs from 'fs';

const blogsMarkdownDir = path.join(process.cwd(), 'src', 'contents', 'blogs');
console.log(blogsMarkdownDir)
const portfoliosMarkdownDir = path.join(process.cwd(), 'src', 'contents', 'portfolios');
console.log(portfoliosMarkdownDir)


export function getBlogs(){
  const blogNames = fs.readFileSync(blogsMarkdownDir, 'utf-8');
  return JSON.stringify(blogNames);
}

export function getPortfolios() {
  const portfolioName = fs.readFileSync(portfoliosMarkdownDir, 'utf-8');
  return portfolioName;
}