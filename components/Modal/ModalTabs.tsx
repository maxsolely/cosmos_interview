import React, { Dispatch, SetStateAction } from 'react';

const TabLabel = ({
 isActive,
 label,
 setActiveTab
}: {
 isActive: boolean;
 label: 'details' | 'generate';
 setActiveTab: Dispatch<SetStateAction<'details' | 'generate'>>;
}) => {
 const baseClass = `w-fit inline-block py-1 px-2  text-slate-100  transition duration-300 ease-in-out hover:cursor-pointer`;
 const activeClass = ' active:shadow-none border-b-2 border-white';
 const inactiveClass = 'text-slate-400';
 //  const disabledClass = 'bg-slate-200  cursor-not-allowed';

 return (
  <label
   className={`
        ${baseClass}
        ${isActive ? activeClass : inactiveClass}
      `}
   onClick={() => setActiveTab(label)}
  >
   {label}
  </label>
 );
};

interface ModalTabsProps {
 activeTab: 'details' | 'generate';
 setActiveTab: Dispatch<SetStateAction<'details' | 'generate'>>;
}

const ModalTabs = ({ activeTab, setActiveTab }: ModalTabsProps) => {
 return (
  <>
   <div className="flex flex-row justify-center items-center gap-2 mb-5">
    <TabLabel
     isActive={activeTab === 'details'}
     label="details"
     setActiveTab={setActiveTab}
    />
    <TabLabel
     isActive={activeTab === 'generate'}
     label="generate"
     setActiveTab={setActiveTab}
    />
   </div>
  </>
 );
};

export default ModalTabs;
