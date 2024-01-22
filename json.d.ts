import { TestData } from "@/app/page";

declare module "blogs" {
  const blogs: TestData;
  export = blogs;
}

declare module "portfolios" {
  const portfolios: TestData;
  export = portfolios;
}

// [IMPORTANT]
// Also, we can use this one if we want don't want to specify types for each element.
// declare module "*.json" {
//   const value: any;
//   export default value;
// }