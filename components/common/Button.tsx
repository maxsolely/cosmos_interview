interface ButtonProps {
 onClick: () => void;
 label: string;
 disabled: boolean;
 customClass?: string;
}

export default function Button({
 onClick,
 label,
 disabled,
 customClass
}: ButtonProps) {
 const downloadButtonClass = `
  w-auto
  ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} 
  ${disabled ? 'text-gray-700' : 'text-white'}
  mx-1 
  p-1 
  px-3 
  rounded-lg 
  border 
  transition-all 
  duration-200 
  ease-in-out 
  bg-transparent 
  ${disabled ? 'border-gray-700' : 'border-gray-400'}
  ${!disabled && 'hover:bg-slate-600'}
  ${!disabled && 'hover:border-gray-500'}`;

 return (
  <label onClick={onClick} className={`${downloadButtonClass} ${customClass}`}>
   {label}
  </label>
 );
}
