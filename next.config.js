/** @type {import('next').NextConfig} */
const nextConfig = {
  // To use Image from next/image.
  // we must register domain that sends the image in the internet.
  images: {
    domains: ['images.unsplash.com', 'thrangra.sirv.com']
  }
}

module.exports = nextConfig
