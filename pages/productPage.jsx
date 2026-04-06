import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../src/components/productCard"
import LoadingAnimation from "../src/components/loadingAnimation"

export default function ProductPage(){

    const [products,setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect (
        ()=>{
            if(loading){
                let url = import.meta.env.VITE_API_URL + "/products/"
                
                if(searchQuery!==""){
                    url = import.meta.env.VITE_API_URL + "/products/search/" + searchQuery 
                }

                axios.get(url)
                .then(
                    (response)=>{
                        setProducts(response.data)
                        setLoading(false)

                    }
                ).catch(
                    (error)=>{
                        toast.error("Failed to fetch products. Please try again!")
                        setLoading(false)
                    }
                )
            }
        }, [loading]
    )
    

    return(
        <div className="flex justify-center items-center flex-wrap bg-primary relative pt-[80px]">
            {
                loading && <LoadingAnimation/>
            }
            <div className="w-full h-[60px] fixed top-[60px] z-99 backdrop-blur-sm flex justify-center items-center">
                <input type="text" placeholder="Search for products..." className="w-[40%] h-[40px] border border-accent rounded-full px-4"
                onChange={
                    (e)=>{
                        setSearchQuery(e.target.value)
                        setLoading(true)
                    }
                }/>

                {/*Get all products button */}
                <button className="ml-4 px-4 py-2 bg-accent text-white rounded-full font-semibold hover:bg-secondary"
                onClick={
                    ()=>{
                        setSearchQuery("")
                        setLoading(true)
                    }
                }>Get All Products</button>
            </div>
            {
                products.map(
                    (item)=>{
                        return(
                            <ProductCard product={item} key={item.productID}/>
                        )
                    }
                )
            }
        </div>
    )
}