import path from 'path';
import fs from 'fs';

const blogsMarkdownDir = path.join(process.cwd(), 'src', 'content', 'blogs');
console.log(blogsMarkdownDir)
const portfoliosMarkdownDir = path.join(process.cwd(), 'src', 'content', 'portfolios');
console.log(portfoliosMarkdownDir)


export function getBlogs() {
  // [Wrong approach!]
  // const blogNames = fs.readFileSync(blogsMarkdownDir);
  // return blogNames;

  // 2) Simple way
  return fs.readdirSync(blogsMarkdownDir);

  // 1) [Need to use call back]
  // fs.readdir(blogsMarkdownDir, (err, files) => {
  //   if (err) {
  //     console.error('Error reading directory:', err);
  //     return;
  //   }
  //   console.log('Files in directory:', files);
  // });
}

export function getPortfolios() {
  return fs.readdirSync(portfoliosMarkdownDir);
}