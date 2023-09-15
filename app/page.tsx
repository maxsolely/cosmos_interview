import { gql } from '@apollo/client';
import { getClient } from '../apollo-client';
import ImageModal from '@/components/Modal/ImageModal';
import { PostObject } from '@/utils/types';
import ImageMasonry from '@/components/ImageMasonry';

const GET_POSTS = gql`
 query GetPosts {
  getPosts {
   __typename
   id
   image {
    __typename
    url
    width
    height
    mp4Url
    hash
    aspectRatio
   }
   tags
  }
 }
`;

// server side function to get posts
async function getPosts() {
 const client = getClient();
 let fetchedPosts: PostObject[] = [];

 try {
  const result = await client.query({
   query: GET_POSTS
  });
  fetchedPosts = result.data.getPosts;
 } catch (error) {
  throw new Error('failed to fetch data');
 }

 return { fetchedPosts };
}

export default async function Home() {
 const postData = await getPosts();
 const fetchedPosts = postData.fetchedPosts;

 return (
  <main className="px-5 py-20">
   <ImageMasonry posts={fetchedPosts} />
   <ImageModal />
  </main>
 );
}
