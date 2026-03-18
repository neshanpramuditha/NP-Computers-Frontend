import { useState } from "react"
import getFormattedDate from "../../pages/utils/dateFormat"
import getFormattedPrice from "../../pages/utils/price-format"
import axios from "axios"
import toast from "react-hot-toast"

export default function ViewOrderInfoModel(props){
    const [isVisible , setIsVisible] = useState(false)
    const [status, setStatus] = useState(props.order.status)
    const [notes, setNotes] = useState("")

    const order = props.order

    function getStatusColor(status){
        if(status === "Pending") return "bg-yellow-100 text-yellow-700"
        if(status === "Processing") return "bg-blue-100 text-blue-700"
        if(status === "Completed") return "bg-green-100 text-green-700"
        if(status === "Cancelled") return "bg-red-100 text-red-700"
        return "bg-gray-100 text-gray-700"
    }

    async function handleChanges(){

        try{
            const token = localStorage.getItem("token")

            await axios.put(import.meta.env.VITE_API_URL+"/orders/"+order.orderID , {
                status:status,
                notes: notes
            },{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            toast.success("Order update successfully")
            window.location.reload()
        }
        catch{
            toast.error("Failed to update order")
        }

        console.log("Saving...", updatedOrder)

        // TODO: Replace with your API call
        // axios.put(`/api/orders/${order._id}`, updatedOrder)

        setIsVisible(false)
    }

    const isChanged = status !== order.status || notes.trim() !== ""
    
    return(
        <>
        <button
        onClick={()=> setIsVisible(true)}
        className="px-4 py-1.5 text-xs font-semibold bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:shadow-md transition">
        View
        </button>

        {
            isVisible && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="w-[650px] h-[700px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

                        {/* HEADER */}
                        <div className="w-full h-[200px] bg-accent p-6 flex flex-col justify-between">

                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-secondary">
                                        {order.orderID}
                                    </h1>
                                    <p className="text-sm text-white/80 mt-1">
                                        {getFormattedDate(order.date)}
                                    </p>
                                </div>

                                <button
                                onClick={()=>setIsVisible(false)}
                                className="w-[36px] h-[36px] text-white text-lg font-bold hover:bg-red-500 rounded-full transition cursor-pointer">
                                    ✕
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-3">

                                <div className="flex flex-col items-center">
                                    <h1 className="text-lg font-semibold text-white">
                                        {order.firstName+" "+order.lastName}
                                    </h1>
                                    <p className="text-sm text-white/90 mt-1 break-all">
                                        {order.email}
                                    </p>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="flex flex-col items-end gap-2">

                                    <p className="text-lg font-semibold text-white">
                                        Total: {getFormattedPrice(order.total)}
                                    </p>

                                    {/* STATUS CONTROL + BADGE */}
                                    <div className="flex items-center gap-2">

                                        <select
                                        value={status}
                                        onChange={(e)=>setStatus(e.target.value)}
                                        className="px-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-white">
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Completed</option>
                                            <option>Cancelled</option>
                                        </select>

                                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(status)}`}>
                                            {status}
                                        </span>

                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* STATUS + NOTE */}
                        <div className="px-6 py-4 border-b bg-gray-50">

                            <h3 className="text-xs font-semibold text-secondary mb-2">
                                Update Order Status & Note
                            </h3>

                            <textarea
                            value={notes}
                            onChange={(e)=>setNotes(e.target.value)}
                            placeholder="Add a note about this order..."
                            className="w-full h-[70px] text-xs px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                            />

                        </div>

                        {/* ORDER ITEMS */}
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">

                            <h2 className="text-md font-semibold text-secondary mb-4">
                                Order Items
                            </h2>

                            {
                                order.items.map((item)=>{
                                    return(
                                        <div key={item.name} className="w-full flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition mb-3">

                                            <div className="flex items-center gap-4">

                                                <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-[65px] w-[65px] object-cover rounded-lg border"
                                                />

                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-secondary">
                                                        {item.name}
                                                    </span>

                                                    <span className="text-xs text-secondary/70">
                                                        Quantity: {item.qty}
                                                    </span>
                                                </div>

                                            </div>

                                            <span className="text-sm font-semibold text-secondary">
                                                {getFormattedPrice(item.price)}
                                            </span>

                                        </div>
                                    )
                                })
                            }

                        </div>

                        {/* FOOTER */}
                        <div className="w-full px-6 py-4 border-t bg-white flex justify-between items-center">

                            <button
                            onClick={handleChanges}
                            disabled={!isChanged}
                            className={`px-5 py-2 text-sm font-semibold rounded-lg shadow transition
                            ${isChanged 
                                ? "bg-blue-500 text-white hover:bg-blue-600" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}>
                                Save Changes
                            </button>

                            <span className="text-xs text-gray-400">
                                All changes will be saved together
                            </span>

                        </div>

                    </div>

                </div>
            )
        }

        </>
    )
}