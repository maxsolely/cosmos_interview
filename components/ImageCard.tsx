'use client';
import Image from 'next/image';
import { CosmosImage } from '@/utils/types';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';

interface ImageCardProps {
 imageObj: CosmosImage;
 tags: string[];
}

// placeholder shimmer
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

// convert to base64 for Next Image placeholder prop
const toBase64 = (str: string) =>
 typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str);

export default function ImageCard({ imageObj, tags }: ImageCardProps) {
 const { url, height, width } = imageObj;
 const { openModal } = useAppContext();
 // create an alt string of the tags associated with the image for SEO purposes
 const altText = tags.length ? tags.join(', ') : 'Cosmos Image';

 return (
  <motion.div
   //  initial={{ opacity: 0, y: 15 }}
   //  animate={{ opacity: 1, y: 0 }}
   exit={{ opacity: 0, y: 15 }}
   transition={{ delay: 0.25, duration: 0.5 }}
   className="cursor-pointer"
   whileHover={{
    scale: 1.025,
    transition: { duration: 0.1 }
   }}
   onClick={() => openModal(imageObj, tags)}
  >
   <Image
    src={url}
    alt={altText}
    width={width}
    height={height}
    placeholder={`data:image/svg+xml;base64,${toBase64(
     shimmer(width, height)
    )}`}
   />
  </motion.div>
 );
}
