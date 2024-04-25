import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const blogsMarkdownDir = path.join(process.cwd(), 'src', 'content', 'blogs');
// console.log(blogsMarkdownDir)
const portfoliosMarkdownDir = path.join(process.cwd(), 'src', 'content', 'portfolios');
// console.log(portfoliosMarkdownDir)


export function getBlogs() {
  return fs.readdirSync(blogsMarkdownDir).map((name) => {
    const filePath = path.join(blogsMarkdownDir, name);
    // string
    const fileContent = fs.readFileSync(filePath, 'utf8')
    // object
    const content = matter(fileContent);
    // console.log(JSON.stringify(content));
    // `matter` converts string to object!
    // { content: "", data: {title:"", description: "", ...}, isEmpty: boolean, excerpt: ""}
    return content;
  });

  // [Wrong approach!]
  // const blogNames = fs.readFileSync(blogsMarkdownDir);
  // return blogNames;

  // 2) Simple way
  // return fs.readdirSync(blogsMarkdownDir);

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
  return fs.readdirSync(portfoliosMarkdownDir).map((name) => {
    const filePath = path.join(portfoliosMarkdownDir, name);
    return matter(fs.readFileSync(filePath, 'utf8'));
  });
}