import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "./utils/cart"
import { BiMinus, BiPlus } from "react-icons/bi"
import getFormattedPrice from "./utils/price-format"
import { Link } from "react-router-dom"

export default function Cart(){
    const [cart, setcart] = useState(getCart())
    
    return(
        <div className="w-full min-h-[calc(100vh-50px)] overflow-y-auto bg-gray-50">
            
            <div className="w-full flex justify-center items-center flex-col gap-6 py-6 px-3 sm:px-4">

            {
                cart.map((cartItem,index)=>{
                    return(
                        <div 
                            key={index} 
                            className="w-full max-w-[650px] bg-white flex flex-col sm:flex-row min-h-[140px] sm:h-[150px] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                        >
                                
                                {/* Image (fixed size) */}
                                <img 
                                    className="w-full sm:w-[150px] h-[150px] object-cover"
                                    src={cartItem.product.image} 
                                    alt={cartItem.product.name}
                                />

                                {/* Middle Section */}
                                <div className="w-full sm:w-[300px] p-4 sm:p-6 flex flex-col justify-between gap-3 h-full">
                                    
                                    <div className="space-y-1">
                                        <p className="text-gray-400 text-xs tracking-widest uppercase">
                                            {cartItem.product.productID}
                                        </p>

                                        {/* Clamp title to 2 lines */}
                                        <h1 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
                                            {cartItem.product.name}
                                        </h1>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="w-full sm:w-[210px] h-[45px] border-2 border-accent rounded-full overflow-hidden flex bg-white shadow-sm">
                                        
                                        <button 
                                            onClick={()=>{
                                                addToCart(cartItem.product, -1)
                                                setcart(getCart())
                                            }} 
                                            className="flex-1 flex justify-center items-center text-xl text-gray-600 hover:bg-accent hover:text-white transition-colors duration-200"
                                        >
                                            <BiMinus/>
                                        </button>

                                        <span className="flex-1 flex justify-center items-center text-lg font-semibold text-gray-700 bg-gray-50 border-x">
                                            {cartItem.qty}
                                        </span>

                                        <button 
                                            onClick={()=>{
                                                addToCart(cartItem.product, 1)
                                                setcart(getCart())
                                            }}
                                            className="flex-1 flex justify-center items-center text-xl text-gray-600 hover:bg-accent hover:text-white transition-colors duration-200"
                                        >
                                            <BiPlus/>
                                        </button>

                                    </div>

                                </div>

                                {/* Price Section */}
                                <div className="w-full sm:w-[250px] flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end px-4 pb-4 sm:pb-0 sm:pr-6 text-right h-full">
                                    
                                    <div className="text-left sm:text-right">
                                        {
                                            cartItem.product.labelledPrice > cartItem.product.price && (
                                                <span className="text-sm text-red-400 line-through block">
                                                    {getFormattedPrice(cartItem.product.labelledPrice)}
                                                </span>
                                            )
                                        }

                                        <span className="text-sm font-medium text-secondary/70 block">
                                            {getFormattedPrice(cartItem.product.price)}
                                        </span>
                                    </div>

                                    <span className="text-lg sm:text-xl text-secondary font-bold">
                                        {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                                    </span>
                                    
                                </div>

                        </div>
                    )
                })
            }

            {/* Bottom Summary */}
            <div className="bg-secondary w-full max-w-[650px] min-h-[90px] sticky bottom-0 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-4 border border-gray-100">

                <Link 
                    state={cart} 
                    to="/checkout" 
                    className="w-full sm:w-auto text-center bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all shadow-md"
                >
                    CHECKOUT
                </Link>

                <span className="text-xl sm:text-2xl font-bold text-white border-b-2 border-accent pb-1">
                    {getFormattedPrice(getCartTotal(cart))}
                </span>

            </div>

        </div>
    </div>
    )
}