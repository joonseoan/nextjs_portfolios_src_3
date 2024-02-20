import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import blogs from './contents/blogs.json';
import portfolios from './contents/portfolios.json';
import { randomize } from './randomizer';

dotenv.config();

export interface TestData {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
};

const app = express();
const port = process.env.PORT;
const pathToContent = path.join(__dirname, 'contents');
const blogsPath = path.join(pathToContent, 'blogs.json');
const portfoliosPath = path.join(pathToContent, 'portfolios.json');
setInterval(randomize, 3000);

app.get('/api/blogs/', (req, res) => {
  // Actually, we can use `import blogs from './contents/blogs.json';` directly
  // however, without nodemon (which means assuming production server that runs in `node index.ts`),
  // the json file or code updates does not work without rebooting the server.
  // Therefore, we would better open the file and refetch the data from json file
  // whenever the json data switches.
  const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
  res.json({ data: blogs });
});

app.get('/api/portfolios/', (req, res) => {
  const portfolios = JSON.parse(fs.readFileSync(portfoliosPath, 'utf-8'));
  res.json({ data: portfolios });
});

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});