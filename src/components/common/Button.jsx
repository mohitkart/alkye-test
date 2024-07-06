export default function Button({children,type='button',disabled=false}){
    return <>
    <button type={type} className="border-none text-[#fff] bg-[#000] px-[40px] py-[12px] text-[16px] font-medium rounded-[5px]" disabled={disabled}>{children}</button>
    </>
}