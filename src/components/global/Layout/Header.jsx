import { useSelector } from "react-redux";

export default function Header(){
    const user = useSelector((state) => state.user);
    return <>header</>
}