import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutDetailsModal(props){
    
    const [isVisible, setIsVisible] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")

    const cart = props.cart

    // Place කරන ඕඩර් එකේ විස්තර BackEnd එකට යවන්න function එකක් හදාගන්නවා 
    async function placeOrder(){

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("You must be logged in to place an order")
            window.location.href = "/login"
            return
        }

        const order = {
            firstName:firstName,
            lastName:lastName,
            addressLine1:addressLine1,
            addressLine2:addressLine2,
            city:city,
            postalCode:postalCode,
            phone:phone,
            country:"Sri Lanka",
            items:[]
            
        }
        cart.forEach(
            (item)=>{
                order.items.push({
                    productID: item.product.productID,
                    qty:item.qty
                })
            }
        )

        try{
            await axios.post(import.meta.env.VITE_API_URL+"/orders", order ,{
                headers:{
                    Authorization: "Bearer " + token
                }
            })

            toast.success("Order placed successfully")
            window.location.href = "/orders"
        
        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to place the order. Please try agin.")
            return
        }
    }

    return(
    
    <>
    <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all shadow-md"
    onClick={
        ()=>{
            setIsVisible(true)
        }}
        >BUY NOW</button>
    {
    isVisible && <div className="w-full h-full bg-black/50 fixed z-50 top-0 left-0 flex justify-center items-center">

    <div className="w-[420px] h-auto bg-white rounded-2xl p-6 shadow-xl relative border border-gray-100">

    <button
        onClick={()=>{setIsVisible(false)}}
        className="w-[36px] h-[36px] flex items-center justify-center absolute top-4 right-4 text-red-500 hover:bg-red-50 rounded-full text-lg font-bold transition">
        ✕
    </button>

    <h1 className="text-xl font-semibold text-secondary mb-6">
        Enter your details
    </h1>

    <div className="flex flex-col gap-4">

        <input
            placeholder="First Name"
            value={firstName}
            onChange={(e)=>{setFirstName(e.target.value)}}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />

        <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />

        <input
            placeholder="Address Line 1"
            value={addressLine1}
            onChange={(e)=>{setAddressLine1(e.target.value)}}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />

        <input
            placeholder="Address Line 2"
            value={addressLine2}
            onChange={(e)=>{setAddressLine2(e.target.value)}}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />

        <input
            placeholder="City"
            value={city}
            onChange={(e)=>{setCity(e.target.value)}}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />

        <input
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e)=>{setPostalCode(e.target.value)}}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />

        <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />

        <button
        onClick={placeOrder}
        className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition shadow-md mt-2">
            CONFIRM
        </button>

    </div>
</div>
    </div>
    }
    </>
    );
}