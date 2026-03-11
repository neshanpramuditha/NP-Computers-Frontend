import { useState } from "react"
import { getCart } from "./utils/cart"
import { BiMinus, BiPlus } from "react-icons/bi"

export default function Cart(){
    const [cart, setcart] =useState(getCart())
    
    return(
        <div className="w-full h-[calc(100vh-50px)] overflow-y-scroll bg-gray-50">
            
            <div className="w-full flex justify-center items-center flex-col gap-6 p-8">
            {
                cart.map(
                    (cartItem,index)=>{
                        return(
                            <div key={index} className="w-[650px] h-[150px] bg-white flex flex-row rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                                    
                                    <img 
                                        className="h-full aspect-square object-cover"
                                        src={cartItem.product.image} 
                                        alt={cartItem.product.name}
                                    />

                                    <div className="h-full w-[300px] p-5 flex flex-col justify-between overflow-hidden">
                                        
                                        <div>
                                            <p className="text-gray-400 text-xs tracking-wide">
                                                {cartItem.product.productID}
                                            </p>

                                            <h1 className="text-lg font-semibold text-gray-800 leading-tight">
                                                {cartItem.product.name}
                                            </h1>
                                        </div>

                                        <div className="w-[210px] h-[45px] border-2 border-accent rounded-full overflow-hidden flex bg-gray-50">
                                            
                                            <button className="w-[70px] h-full flex justify-center items-center text-xl font-bold text-gray-600 hover:bg-accent hover:text-white transition-colors duration-200">
                                                <BiMinus/>
                                            </button>

                                            <span className="w-[70px] h-full flex justify-center items-center text-lg font-semibold text-gray-700 bg-white">
                                                {cartItem.qty}
                                            </span>

                                            <button className="w-[70px] h-full flex justify-center items-center text-xl font-bold text-gray-600 hover:bg-accent hover:text-white transition-colors duration-200">
                                                <BiPlus/>
                                            </button>

                                        </div>

                                    </div>
                            </div>
                        )
                    }
                    )
            }
            </div>

        </div>
    )
}