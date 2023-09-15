'use client';
import { CosmosImage } from '@/utils/types';
import { useContext, createContext } from 'react';

interface AppContextProps {
 isModalOpen: boolean;
 modalImage: CosmosImage | null;
 modalTags: string[];
 openModal: (image: CosmosImage, tags: string[]) => void;
 closeModal: () => void;
 selectTag: (tag: string, appOrModal: 'app' | 'modal') => void;
 removeTag: (tag: string, appOrModal: 'app' | 'modal') => void;
 selectedTags: string[];
 defaultTags: string[];
 selectedModalTags: string[];
}

const AppContext = createContext<AppContextProps>({
 isModalOpen: false,
 modalImage: null,
 modalTags: [],
 openModal: (image, tags) => {},
 closeModal: () => {},
 selectedTags: [],
 selectedModalTags: [],
 selectTag: (tag, appOrModal) => {},
 removeTag: (tag, appOrModal) => {},
 defaultTags: ['wood', 'interior design', 'art', 'sky']
});

const useAppContext = () => useContext(AppContext);
export { AppContext, useAppContext };
