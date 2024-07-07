import { Link } from "react-router-dom";

export default function ArticleCard({ item }) {
    return <>
        <div className="!w-[240px] md:!w-[350px] px-[10px] relative articleCard">
            <img src={item.image_url} className="rounded-[16px] w-full object-cover h-[350px]" />
            <div className="absolute hidden w-full h-full p-[25px] overflow-auto bg-[#00000085] top-0 left-0">
                <h4 className="text-[16px] font-medium mb-2">{item.title}</h4>
                <p className="text-[14px]">{item.short_description}</p>
                <Link to={`/article/${item.id}`} className="inline-block bg-[#fff] text-[#000] font-medium px-[14px] py-[6px] text-[12px] rounded-[4px] mt-2">Read More</Link>
            </div>
        </div>
    </>
}