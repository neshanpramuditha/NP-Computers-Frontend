import { useState } from "react"
import { getCartTotal } from "./utils/cart"
import { BiMinus, BiPlus } from "react-icons/bi"
import getFormattedPrice from "./utils/price-format"
import { useLocation, useNavigate } from "react-router-dom"
import CheckoutDetailsModal from "../src/components/checkoutdetailsModel"


export default function Checkout(){

    const location = useLocation()
    const [cart, setcart] = useState(location.state || [])
    const navigate = useNavigate()


    if (location.state == null){
        navigate ("/products")
    }
    
    return(
        <div className="w-full h-[calc(100vh-50px)] overflow-y-scroll bg-gray-50">
            
            <div className="w-full flex justify-center items-center flex-col gap-6 py-10 px-4">

            {
                cart.map(
                    (cartItem,index)=>{
                        return(
                            <div key={index} className="w-[650px] h-[150px] bg-white flex flex-row rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                                    
                                    <img 
                                        className="h-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                        src={cartItem.product.image} 
                                        alt={cartItem.product.name}
                                    />

                                    <div className="h-full w-[300px] p-6 flex flex-col justify-between overflow-hidden">
                                        
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-xs tracking-widest uppercase">
                                                {cartItem.product.productID}
                                            </p>

                                            <h1 className="text-lg font-semibold text-gray-800 leading-snug">
                                                {cartItem.product.name}
                                            </h1>
                                        </div>

                                        <div className="w-[210px] h-[45px] border-2 border-accent rounded-full overflow-hidden flex bg-white shadow-sm">
                                            
                                            <button onClick={
                                                ()=>{
                                                    const newCart = [...cart]

                                                    newCart[index].qty = newCart[index].qty - 1

                                                    if(newCart[index].qty <= 0){
                                                        newCart.splice(index,1)
                                                    }
                                                    setcart(newCart)
                                                }
                                            } 
                                            className="w-[70px] h-full flex justify-center items-center text-xl text-gray-600 hover:bg-accent hover:text-white transition-colors duration-200">
                                                <BiMinus/>
                                            </button>

                                            <span className="w-[70px] h-full flex justify-center items-center text-lg font-semibold text-gray-700 bg-gray-50 border-x">
                                                {cartItem.qty}
                                            </span>

                                            <button onClick={
                                                ()=>{
                                                    const newCart = [...cart] //Cart එකේ තියෙන ඒවා කොපියක් අරන් newCart variable එකට දාගන්න කියල කියන්නේ මෙහෙම. සාමාන්‍ය variable එකක් assign කරනවා වගේ කරන්න බෑ cart කියන එක ලොකු array එකක් නිසා 
                                                    newCart[index].qty = newCart[index].qty + 1
                                                    setcart(newCart)
                                                }
                                            }
                                            className="w-[70px] h-full flex justify-center items-center text-xl text-gray-600 hover:bg-accent hover:text-white transition-colors duration-200">
                                                <BiPlus/>
                                            </button>

                                        </div>

                                    </div>

                                    <div className="w-[250px] h-full flex flex-col justify-center items-end pr-6 text-right">
                                        
                                        {
                                            cartItem.product.labelledPrice > cartItem.product.price && (
                                                <span className="text-sm text-red-400 line-through">
                                                    {getFormattedPrice(cartItem.product.labelledPrice)}
                                                </span>
                                            )
                                        }

                                        <span className="text-sm font-medium text-secondary/70">
                                            {getFormattedPrice(cartItem.product.price)}
                                        </span>

                                        <span className="text-xl text-secondary font-bold mt-1">
                                            {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                                        </span>
                                        
                                    </div>

                            </div>
                        )
                    }
                )
            }

            <div className="bg-secondary w-[650px] h-[100px] sticky bottom-0 rounded-2xl shadow-lg flex items-center px-6 border border-gray-100">
                <CheckoutDetailsModal cart={cart}/>
                <span className="text-2xl font-bold text-white absolute right-6 border-b-2 border-accent pb-1 hover:border-red-500">
                    {getFormattedPrice(getCartTotal(cart))}
                </span>

            </div>

        </div>
    </div>
    )
}