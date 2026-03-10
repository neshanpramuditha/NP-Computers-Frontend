import axios from "axios"
import { useEffect, useState} from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import LoadingAnimation from "./loadingAnimation"
import ImageSlideShow from "./imageSlideShow"

export default function Overview(){
    const params = useParams()
    const [product, setProduct] = useState(null)

    // Fetch product detailes using productID
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_API_URL+"/products/"+params.productID
            ).then(
                (response)=>{
                    setProduct(response.data)
                }
            ).catch(
                (error)=>{
                    console.log(error);
                    toast.error("Failed to fetch product details!");
                }
            )
        
        },[]
    )
    return(
        <div className="w-full h-[calc(100vh-50px)] flex justify-center items-center ">
            {
                product==null?<LoadingAnimation/>:
                <div className="w-full h-full flex ">
                    <div className="w-[50%] h-full">
                        <ImageSlideShow images={product.images}/>
                    </div>
                    
                    <div className="w-[50%] h-full">
                        
                    </div>
                </div>
            }
        </div>
    )
}