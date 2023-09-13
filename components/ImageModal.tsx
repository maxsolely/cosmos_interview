'use client';
import { MouseEvent } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import TagChip from './TagChip';
import { motion, AnimatePresence } from 'framer-motion';

// TODO:
// 1. add tabs to the top of modal: 'Details' & 'Generate'
// 2. extract the image, tags, and download button into its own component and render that if Details is active
// 3. If Generate is clicked, switch contents of modal to display tags
// 4. auto generate a prompt into an input field based off those tags (allow user to edit)
//    The tags can be toggled and prompt would autopopulate based off only selected tags
// 5. Generate image based off the midjourney docs - https://www.thenextleg.io/docs/v2/imagine
// -------------------------------------------------
// Generation can be done server side (preferred):
// -- Create a backend enpoint and handle requests to midjourney from there
// Or client side
// -- Have another input field for a midjourney api key and send request from the FE

export default function ImageModal() {
 const { modalImage, modalTags, closeModal, isModalOpen } = useAppContext();
 const { url = '', height = 0, width = 0 } = modalImage || {};

 const stopPropagation = (e: MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation();
 };

 const downloadImage = async (url: string): Promise<void> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = `comos-${Date.now()}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
 };

 const modalClass = `
 relative 
 z-10 
 min-h-[85vh] 
 max-h-[85vh] 
 w-[85vw] 
 mx-auto 
 bg-black 
 border 
 border-white 
 rounded-lg 
 p-6
 md:p-12 
 flex 
 justify-center`;

 const downloadButtonClass = `
  w-auto
  cursor-pointer 
  mx-1 
  p-1 
  px-3 
  rounded-lg 
  border 
  transition-all 
  duration-200 
  ease-in-out 
  bg-transparent 
  border-gray-400'
  hover:bg-slate-600 
  hover:border-gray-500`;

 return (
  <AnimatePresence>
   {isModalOpen ? (
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     className="fixed inset-0 z-50 flex items-center justify-center"
     onClick={closeModal}
    >
     <div className="absolute inset-0 bg-black opacity-80" />
     <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '100%' }}
      className={modalClass}
      onClick={stopPropagation}
     >
      <div>
       <button
        onClick={closeModal}
        className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-2xl"
       >
        X
       </button>
       <div className="relative flex justify-center h-[65%] md:h-[80%] mb-5">
        <Image
         src={url}
         alt="Cosmos Modal Image"
         width={width}
         height={height}
         style={{ objectFit: 'contain' }}
        />
       </div>
       <div className=" relative flex flex-col justify-center items-center h-[35%] md:h-[20%] py-5">
        <div className="flex justify-center items-center flex-wrap flex-row gap-2 mb-5 overflow-y-scroll">
         {modalTags?.length
          ? modalTags
             .slice(0, 5)
             .map((label: string) => (
              <TagChip
               key={`${label}-chip`}
               label={label}
               selected
               disableOnClick
              />
             ))
          : null}
        </div>
        <div className="flex">
         <label
          onClick={() => downloadImage(url)}
          className={downloadButtonClass}
         >
          Download Image
         </label>
        </div>
       </div>
      </div>
     </motion.div>
    </motion.div>
   ) : null}
  </AnimatePresence>
 );
}
