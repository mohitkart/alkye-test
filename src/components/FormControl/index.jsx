import { useState } from "react";
import methodModel from "../../methods/methods";

export default function FormControl({type='text',value,onChange=()=>{},placeholder="",minLength,maxLength,required=false}){
const [eye,setEye]=useState(false)

    const className="border border-[#939393] md:px-[24px] px-[16px] md:py-[17px] py-[12px] md:text-[16px] text-[14px] w-full rounded-[5px]"
    return <>
        {type=='number'?<>
        <input type="text" autocomplete="off" minLength={minLength} maxLength={maxLength} required={required} placeholder={placeholder} className={className} value={value} onChange={e=>onChange(methodModel.isNumber(e))} />
        </>:type=='password'?<>
        <div className="relative">
            <input type={eye?'text':'password'} autocomplete="off" minLength={minLength} maxLength={maxLength} required={required} placeholder={placeholder} className={className} value={value} onChange={e=>onChange(e.target.value)} />


            <span onClick={()=>setEye(!eye)}
            className="material-symbols-outlined absolute md:top-[22px] top-[15px] right-[20px] md:text-[20px] text-[18px] cursor-pointer"
            >{eye?'visibility':'visibility_off'}</span>
        </div>
        
        </>:<>
        <input type={type} autocomplete="off" minLength={minLength} maxLength={maxLength} required={required} placeholder={placeholder} className={className} value={value} onChange={e=>onChange(e.target.value)} />
        </>}
    </>
}