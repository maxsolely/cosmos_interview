'use client';
import { CosmosImage } from '@/utils/types';
import { useContext, createContext } from 'react';

interface GifContextProps {
 isModalOpen: boolean;
 modalImage: CosmosImage | null;
 modalTags: string[];
 openModal: (image: CosmosImage, tags: string[]) => void;
 closeModal: () => void;
 selectTag: (tag: string) => void;
 removeTag: (tag: string) => void;
 selectedTags: string[];
 defaultTags: string[];
}

const AppContext = createContext<GifContextProps>({
 isModalOpen: false,
 modalImage: null,
 modalTags: [],
 openModal: (image, tags) => {},
 closeModal: () => {},
 selectedTags: [],
 selectTag: (tag) => {},
 removeTag: (tag) => {},
 defaultTags: ['wood', 'interior design', 'art', 'sky']
});

const useAppContext = () => useContext(AppContext);
export { AppContext, useAppContext };
