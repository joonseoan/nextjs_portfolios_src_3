import fs from 'fs';
import path from 'path';
import { TestData } from 'src';

const NUM_COUNT = 20;

export function randomize() {
  const filePath = path.join(__dirname, 'contents', 'blogs.json');
  const content = fs.readFileSync(filePath, 'utf-8');
  const blogs: TestData[] = JSON.parse(content);

  blogs.forEach((blog) => {
    const randomId = Math.floor(Math.random() * NUM_COUNT);
    blog.id = randomId.toString();
    blog.slug = `Some-Blog-${randomId}`;
    blog.title = `Some Blog ${randomId}`;
  });

  fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
}
