'use client';
import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import ModalTabs from './ModalTabs';
import ModalDetails from './ModalDetails';
import { ModalGenerate } from './ModalGenerate';

// TODO:
// 5. Generate image based off the midjourney docs - https://www.thenextleg.io/docs/v2/imagine
// -------------------------------------------------
// Generation can be done server side (preferred):
// -- Create a backend enpoint and handle requests to midjourney from there
// Or client side
// -- Have another input field for a midjourney api key and send request from the FE

export default function ImageModal() {
 const [activeTab, setActiveTab] = useState<'details' | 'generate'>('details');
 const { closeModal, isModalOpen } = useAppContext();

 const stopPropagation = (e: MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation();
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
 md:p-8
 flex 
 justify-center`;

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
       <ModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
       {activeTab === 'details' ? <ModalDetails /> : <ModalGenerate />}
      </div>
     </motion.div>
    </motion.div>
   ) : null}
  </AnimatePresence>
 );
}
