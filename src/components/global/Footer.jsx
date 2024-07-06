import { useEffect } from "react"
import { Link, useFetcher } from "react-router-dom"

export default function Footer(){

    const socialIcons=[
        {icon:'facebook.png',link:'https://www.google.com/'},
        {icon:'instagram.png',link:'https://www.google.com/'},
        {icon:'twitter.png',link:'https://www.google.com/'},
        {icon:'twitch.png',link:'https://www.google.com/'},
        {icon:'youtube.png',link:'https://www.google.com/'},
    ]

    const menu=[
        {name:'Privacy Policy',url:'/'},
        {name:'Contact Us',url:'/'},
        {name:'Cookie preferences',url:'/'},
        {name:'Corporate Information',url:'/'},
        {name:'Privacy Policy',url:'/'},
        {name:'Contact Us',url:'/'},
        {name:'Cookie preferences',url:'/'},
        {name:'Corporate Information',url:'/'},
    ]

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'auto' });
    },[])

    return <>
    <div className="px-[30px] pt-[60px] md:pb-[40px] pb-[20px] bg-[#000]">
        <div className="mx-auto max-w-[1200px]">
        <div className="flex gap-[15px] mb-[40px]">
            {socialIcons.map(itm=>{
               return <a target="_new" href={itm.link}><img src={`/assets/icons/${itm.icon}`} className="w-[30px] h-[30px]" /></a>
            })}
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-[60px]">
            {menu.map(item=>{
                return <>
                <Link className="text-[#fff] font-extrabold text-[14px]" to={item.url}>{item.name}</Link>
                </>
            })}
        </div>
        <div className="text-[14px] font-medium text-[#fff]">
        © Alkye Test
        </div>
        </div>
        
    </div>
    </>
}