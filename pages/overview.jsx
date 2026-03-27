import axios from "axios"
import { useEffect, useState} from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import LoadingAnimation from "../src/components/loadingAnimation"
import ImageSlideShow from "../src/components/imageSlideShow"
import getFormattedPrice from "./utils/price-format"
import { addToCart, getCart } from "./utils/cart"

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
        <div className="w-full lg:h-[calc(100vh-50px)] flex justify-center items-center">
            {
                product==null?<LoadingAnimation/>:
                <div className="w-full flex flex-col lg:flex-row bg-primary p-4 lg:p-0">
                    <h1 className="text-3xl font-bold mb-4 lg:hidden">{product.name}
                            <span>
                                {
                                product.altNames.map(
                                    (altNames, index)=>{
                                        return(<span key={index} className=" text-gray-500 font-medium">, {altNames}</span>)
                                    }
                                )
                                }
                            </span>
                    </h1>
                    <div className="w-full lg:w-[50%] lg:h-full flex justify-center items-center">
                        <ImageSlideShow images={product.images}/>
                    </div>
                    
                    <div className="lg:w-[50%] h-full p-5 flex flex-col justify-center">
                        <h1 className="hidden lg:block text-3xl font-bold mb-4">{product.name}
                            <span>
                                {
                                product.altNames.map(
                                    (altNames, index)=>{
                                        return(<span key={index} className=" text-gray-500 font-medium">, {altNames}</span>)
                                    }
                                )
                                }
                            </span>
                    </h1>

                        {/* Brand & model if available */}
                        {(product.brand || product.model)&&
                        <p className="text-lg font-medium">
                            <span>{product.brand || ""}</span>
                            <span> - </span>
                            <span>{product.model || ""}</span>
                        </p>                        
                        }
                        {/* product ID */}
                        <p className="text-sm text-gray-500 mb-4">{product.productID || ""}</p>
                        
                        {/* Price */}
                        <p className="text-2xl font-bold mb-4">{getFormattedPrice(product.price)}</p>

                        {/* Lablled Price */}
                        {
                            product.labelledPrice &&
                            <p className="text-lg text-red-500 line-through mb-4">{getFormattedPrice(product.labelledPrice)}</p>
                        }

                        {/* Discription */}
                        <p className="text-sm text-gray-500 mb-4">{product.description || ""}</p>
                    
                        <div className="w-full h-[100px] flex justify-start items-center font-bold text-white">
                            <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 cursor-pointer" onClick={
                                ()=>{
                                    addToCart(product , 1)
                                    toast.success(product.name + " added to cart")
                                }
                            }>ADD TO CART</button>

                            <Link to="/checkout" state={
                                [
                                    {
                                        product:{
                                            name:product.name,
                                            price:product.price,
                                            labelledPrice:product.labelledPrice,
                                            image:product.images[0],
                                            productID:product.productID
                                        },
                                        qty:1
                                    }

                                ]
                            } className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 ml-4 text-bold cursor-pointer">BUY NOW</Link>


                        </div>
                    
                    </div>
                </div>
            }
        </div>
    )
}