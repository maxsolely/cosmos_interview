'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PostObject } from '@/utils/types';
import ImageCard from '@/components/ImageCard';
import TagsContianer from './TagsContainer';
import { useAppContext } from '@/contexts/AppContext';
import '../styles.css';

interface ImageMasonry {
 posts: PostObject[];
}

export default function ImageMasonry({ posts }: ImageMasonry) {
 const { selectedTags } = useAppContext();
 const [allPosts, setAllPosts] = useState<PostObject[]>(posts);
 const [filteredPosts, setFilteredPosts] = useState<PostObject[]>([]);

 useEffect(() => {
  // Check if the post has at least one tag that is in the selectedTags array
  const newFilteredPosts = allPosts.filter((post) => {
   return post.tags.some((tag) => selectedTags.includes(tag));
  });

  setFilteredPosts(newFilteredPosts);

  // Scroll to the top of the window smoothly
  window.scrollTo({
   top: 0,
   behavior: 'smooth'
  });
 }, [selectedTags, allPosts]);

 const renderPosts = (posts: PostObject[]): JSX.Element[] => {
  return posts.map((post: PostObject) => (
   <div className="inline-block w-full mb-4 " key={post.id}>
    <ImageCard key={post.id} imageObj={post.image} tags={post.tags} />
   </div>
  ));
 };

 return (
  <div>
   <TagsContianer />
   <div className="masonry">
    <AnimatePresence>
     {filteredPosts.length ? renderPosts(filteredPosts) : renderPosts(allPosts)}
    </AnimatePresence>
   </div>
  </div>
 );
}
