import { Link } from "react-router-dom"

const AuthLayout=({children})=>{
    return <>
     <div className='px-[30px] py-[60px] bg-[#F4F4F4]'>
     <div className='mx-auto max-w-[1200px] px-[50px] py-[60px] bg-[#fff] rounded-[30px]'>
      <div className="mb-[60px]">
        <img src="/assets/logo/logo.png" className="max-w-[100px]" />
      </div>
       {children}
   </div>
      </div>
    </>
}

export default AuthLayout