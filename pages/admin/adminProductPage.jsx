import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductPage(){
    return(
        <div className="w-full h-full overflow-y-scroll">
            <Link to = "/admin/add-product" className="text-white  bg-accent w-[50px] h-[50px] flex justify-center items-center rounded-[15px] hover:rounded-full fixed bottom-12 right-12">
                <FaPlus />
            </Link>
        </div>
    )

}