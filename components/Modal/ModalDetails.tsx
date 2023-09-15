import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import Button from '../common/Button';
import ModalTags from './ModalTags';

export default function ModalDetails() {
 const { modalImage, modalTags } = useAppContext();
 const { url = '', height = 0, width = 0 } = modalImage || {};

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

 return (
  <>
   <div className="relative flex justify-center h-[80%]  mb-5">
    <Image
     src={url}
     alt="Cosmos Modal Image"
     width={width}
     height={height}
     style={{ objectFit: 'contain' }}
    />
   </div>
   <div className="relative flex flex-col justify-center items-center flex-1 ">
    {/* <ModalTags
     tags={modalTags}
     limit={5}
     disableOnClick={true}
     isSelected={() => true}
    /> */}
    <div className="flex">
     <Button
      onClick={() => downloadImage(url)}
      label="Download Image"
      disabled={!url}
     />
    </div>
   </div>
  </>
 );
}
