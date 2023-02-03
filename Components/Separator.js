export default function Separator ({ color = false, className }) {
  return <div className={`${color || 'bg-[#CCC]'} ${className} h-[0.5px] w-full my-4`}/>
}
