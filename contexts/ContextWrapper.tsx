'use client';
import React, { useState } from 'react';
import { AppContext } from './AppContext';
import { CosmosImage } from '@/utils/types';

interface ContextWrapperProps {
 children: React.ReactNode;
}

export default function ContextWrapper({ children }: ContextWrapperProps) {
 const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 const [modalImage, setModalImage] = useState<CosmosImage | null>(null);
 const [modalTags, setModalTags] = useState<string[]>([]);
 const [selectedTags, setSelectedTags] = useState<string[]>([]);
 const defaultTags = ['wood', 'interior design', 'art', 'sky'];

 const selectTag = (tag: string) => {
  setSelectedTags((prev) => [...prev, tag]);
 };

 const removeTag = (tag: string) => {
  setSelectedTags((prevSelectedTags) => {
   return prevSelectedTags.filter((t) => t !== tag);
  });
 };

 const openModal = (image: CosmosImage, tags: string[]) => {
  setIsModalOpen(true);
  setModalImage(image);
  setModalTags(tags);
 };

 const closeModal = () => {
  setIsModalOpen(false);
  setModalImage(null);
  setModalTags([]);
 };

 return (
  <AppContext.Provider
   value={{
    isModalOpen,
    modalImage,
    modalTags,
    openModal,
    closeModal,
    selectTag,
    removeTag,
    selectedTags,
    defaultTags
   }}
  >
   {children}
  </AppContext.Provider>
 );
}
