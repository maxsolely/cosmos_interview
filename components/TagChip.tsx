import { MouseEventHandler } from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface ChipProps {
 label: string;
 selected: boolean;
 disableOnClick: boolean;
}

export default function TagChip({
 label,
 selected,
 disableOnClick = false
}: ChipProps) {
 const { selectTag, removeTag } = useAppContext();

 const chipClass = `
  ${!disableOnClick ? 'cursor-pointer' : 'cursor-default'} 
  mx-1 
  p-1 
  px-3 
  text-xs
  rounded-lg 
  border 
  transition-all 
  duration-200 
  ease-in-out 
  max-h-8
  w-fit
  ${
   selected ? 'bg-slate-500 border-gray-500' : 'bg-transparent border-gray-400'
  } 
  ${!disableOnClick ? 'hover:bg-slate-600' : ''}
  ${disableOnClick ? 'hover:border-gray-500' : ''}`;

 const onChipClick = (label: string): MouseEventHandler<HTMLDivElement> => {
  return (event) => {
   if (disableOnClick) return;
   if (selected) {
    removeTag(label);
   } else {
    selectTag(label);
   }
  };
 };

 return (
  <div className={chipClass} onClick={onChipClick(label)}>
   {label}
  </div>
 );
}
