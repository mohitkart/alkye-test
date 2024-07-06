export default function Button({children,type='button',disabled=false}){
    return <>
    <button type={type} disabled={disabled}>{children}</button>
    </>
}