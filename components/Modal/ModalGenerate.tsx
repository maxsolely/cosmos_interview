'use client';
import { useEffect, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import Button from '../common/Button';
import ModalTags from './ModalTags';

export function ModalGenerate() {
 const { modalTags, selectedModalTags } = useAppContext();
 const [imageLoading, setImageLoading] = useState<boolean>(false);
 const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
 const [prompt, setPrompt] = useState<string>('');

 // Documentation found at:  https://www.thenextleg.io/docs/v2/getting-started

 // Would definitely extract this to the backend and have it's own endpoint
 const generateImage = async () => {
  setImageLoading(true);
  setGeneratedUrl(null);
  var jobIsDone = false;

  // generate image
  const requestData = JSON.stringify({
   msg: `${prompt}`
  });
  const response = await fetch('https://api.thenextleg.io/v2/imagine', {
   method: 'POST',
   headers: {
    Authorization: 'Bearer <your-token>',
    'Content-Type': 'application/json'
   },
   body: requestData
  });
  const responseData = await response.json();
  const { success, messageId } = responseData;

  if (!success) {
   console.error('Image generation failed:', responseData);
   setImageLoading(false);
   return;
  }

  // get progress of the image generation process
  while (!jobIsDone) {
   try {
    const progressRequest = await fetch(
     `https://api.thenextleg.io/v2/message/${messageId}?expireMins=5`
    );
    const progressData = await progressRequest.json();
    const { progress } = progressData;

    console.log('generation progress at ', progress);

    if (progress === 100) {
     const { imageUrl } = progressData;
     console.log(imageUrl);
     setGeneratedUrl(imageUrl);
     jobIsDone = true;
    }

    // Add a delay before the next request
    await new Promise((resolve) => setTimeout(resolve, 2000));
   } catch (error) {
    console.error('An error occurred:', error);
    setImageLoading(false);
    break;
   }
  }

  setImageLoading(false);
 };

 const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setPrompt(value);
 };

 useEffect(() => {
  setPrompt(selectedModalTags.join(' '));
 }, [selectedModalTags]);

 return (
  <div className="flex flex-col justify-center items-center">
   <p className="mb-5">
    Select some of these photo&apos;s tags to populate a prompt to generate a
    new image
   </p>
   <ModalTags
    tags={modalTags}
    limit={null}
    disableOnClick={false}
    isSelected={(label) => selectedModalTags.indexOf(label) >= 0}
   />
   {prompt ? (
    <div className="flex flex-col justify-center items-center mt-5 w-full">
     <input
      type="text"
      value={prompt}
      onChange={handlePromptChange}
      className="w-full text-white bg-transparent border border-slate-200  focus:border-slate-300 focus:outline-none p-2 rounded"
     />
     <div className="mt-5">
      <Button
       onClick={() => generateImage()}
       label={imageLoading ? 'Loading' : 'Generate'}
       disabled={!prompt || imageLoading}
      />
     </div>
    </div>
   ) : null}
   {/* // Not the actual width and height of the image, just placeholders */}
   {generatedUrl ? (
    <Image
     alt="generated_midjourney"
     src={generatedUrl}
     width={500}
     height={500}
    />
   ) : null}
  </div>
 );
}
