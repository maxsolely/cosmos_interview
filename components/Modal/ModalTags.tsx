import TagChip from '../TagChip';

interface ModalTags {
 tags: string[];
 limit: number | null;
 disableOnClick: boolean;
 isSelected: (label: string) => boolean;
}

export default function ModalTags({
 tags,
 limit,
 disableOnClick,
 isSelected
}: ModalTags) {
 const tagsToRender = limit ? tags.slice(0, limit) : tags;
 return (
  <div className="flex justify-center items-center flex-wrap flex-row gap-2 mb-5">
   {tagsToRender?.length
    ? tagsToRender.map((label: string) => (
       <TagChip
        key={`${label}-chip`}
        label={label}
        selected={isSelected(label)}
        disableOnClick={disableOnClick}
        tagType="modal"
       />
      ))
    : null}
  </div>
 );
}
