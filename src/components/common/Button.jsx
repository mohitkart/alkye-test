export default function Button({children,type='button',disabled=false,className='',loading=false}){
    return <>
    <button type={type} className={`border-none text-[#fff] bg-[#000] md:px-[50px] px-[30px] md:py-[15px] py-[12px] md:text-[16px] text-[13px] font-extrabold rounded-[5px] ${className}`} disabled={disabled||loading}>{loading?<>
    Loading...
    </>:children}</button>
    </>
}