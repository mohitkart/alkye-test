import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user";

export default function DashboardLayout({ children }) {
    const user=useSelector(state=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
const Logout=()=>{
    dispatch(logout())
}

    return <>

        <div className="md:pt-[90px] pt-[60px] bg-[#000] pb-[50px] px-[30px]">
            <div className="mx-auto max-w-[1200px] text-[#fff]">
                <div className="mb-[28px]">
                    <img src="/assets/logo/logo_white.png" onClick={()=>navigate('/dashboard')} className="w-[100px] cursor-pointer" />
                </div>
                <div className="text-[23px] md:text-[30px] font-medium mb-[9px]">
                    Welcome {` `}
                    <div className="dropdown">
                    <span className="underline cursor-pointer capitalize font-medium">{user?.username}</span>
                    <div className="menus">
                        <span onClick={Logout}>Logout</span>
                    </div>
                    </div>
                    
                </div>
                <p className="text-[13px] md:text-[16px] font-medium mb-[30px]">Hope you having a good day!</p>

                {children}

            </div>
        </div>

<Footer/>
    </>
}