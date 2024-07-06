import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "../components/global/DashboardLayout"
import { Link, useNavigate, useParams } from "react-router-dom"
import Slider from "react-slick";
import ApiClient from "../methods/api/apiClient";

export default function ArticleDetail() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(false)
    const {id} =useParams()

    var settings = {
        dots: true,
        arrows:false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true
    };

    const getArticles = () => {
        setLoading(true)
        ApiClient.get('', {}).then(res => {
            setLoading(false)
            if (res.success) {
                let data=res.data
                let detail=data?.find(itm=>itm.id==id)
                setDetail(detail)
                setArticles(data)
            }
        })
    }

    useEffect(() => {
        if (!user.loggedIn) {
            navigate('/login')
        } else {
            getArticles()
        }
    }, [user,id])

    return <>
        <DashboardLayout>

        <div className="mb-4">
                            <span onClick={()=>navigate('/dashboard')} className="cursor-pointer inline-flex items-center gap-2">
                            <span class="material-symbols-outlined text-[24px]">arrow_back</span> Back
                            </span>
                        
                        </div>

            {loading ? <>
                <svg aria-hidden="true" role="status" class="inline w-7 h-7 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
            </> : <>
            <img src={detail?.image_url} className="w-full mb-3 rounded-[20px]" />
            <h3 className="text-[30px] font-weight-medium mb-4">{detail?.title}</h3>
               <div className="">{detail?.content}</div>
            </>}

            <h3 className="text-[30px] font-weight-medium mb-4 mt-[60px]">Related Articles</h3>

            {loading ? <>
                <svg aria-hidden="true" role="status" class="inline w-7 h-7 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
            </> : <>
                {articles.filter(itm=>itm.prompt==detail?.prompt).length ? <>
                    <Slider {...settings}>
                        {articles.filter(itm=>itm.prompt==detail?.prompt).map(item => {
                            return <>
                                <div className="w-[240px] md:w-[350px] px-[10px] relative articleCard">
                                    <img src={item.image_url} className="rounded-[16px] w-full object-cover h-[350px]" />
                                    <div className="absolute hidden w-full h-full p-[25px] overflow-auto bg-[#00000085] top-0 left-0">
                                        <h4 className="text-[16px] font-weight-medium mb-2">{item.title}</h4>
                                        <p className="text-[14px]">{item.short_description}</p>
                                        <Link to={`/article/${item.id}`} className="inline-block bg-[#fff] text-[#000] font-weight-medium px-[14px] py-[6px] text-[12px] rounded-[4px] mt-2">Read More</Link>
                                    </div>
                                </div>
                            </>
                        })}
                    </Slider>

                </> : <></>}
            </>}


        </DashboardLayout>
    </>
}