import TagChip from './TagChip';
import { useAppContext } from '@/contexts/AppContext';

export default function TagsContianer() {
 const { defaultTags, selectedTags } = useAppContext();

 return (
  <div className="fixed top-0 left-0 w-full h-14 bg-black z-50 shadow-md border-b-1 border-slate-100">
   <div className="flex flex-row justify-center items-center h-full w-full">
    {defaultTags.map((label: string) => (
     <TagChip
      key={`${label}-chip`}
      label={label}
      selected={selectedTags.indexOf(label) >= 0}
      disableOnClick={false}
      tagType="app"
     />
    ))}
   </div>
  </div>
 );
}
