import methodModel from "../../methods/methods";

export default function FormControl({type='text',value,onChange=()=>{},placeholder=""}){
    const className="border border-[#939393] px-[20px] py-[12px] text-[16px] w-full rounded-[5px]"
    return <>
        {type=='number'?<>
        <input type="text" placeholder={placeholder} className={className} value={value} onChange={e=>onChange(methodModel.isNumber(e))} />
        </>:<>
        <input type={type} placeholder={placeholder} className={className} value={value} onChange={e=>onChange(e.target.value)} />
        </>}
    </>
}