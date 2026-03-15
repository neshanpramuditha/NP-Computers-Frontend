import { useState } from "react"
import getFormattedDate from "../../pages/utils/dateFormat"
import getFormattedPrice from "../../pages/utils/price-format"

export default function ViewOrderInfoModel(props){
    const [isVisible , setIsVisible] = useState(false)
    const [status, setStatus] = useState(props.order.status)

    const order = props.order

    function getStatusColor(status){
        if(status === "Pending") return "bg-yellow-100 text-yellow-700"
        if(status === "Processing") return "bg-blue-100 text-blue-700"
        if(status === "Completed") return "bg-green-100 text-green-700"
        if(status === "Cancelled") return "bg-red-100 text-red-700"
        return "bg-gray-100 text-gray-700"
    }
    
    return(
        <>

        <button
        onClick={()=>{
            setIsVisible(true)
        }}
        className="px-4 py-1.5 text-xs font-semibold bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:shadow-md transition">
        View
        </button>

        {
            isVisible && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="w-[650px] h-[620px] bg-white rounded-xl shadow-2xl overflow-hidden">

                        {/* HEADER */}
                        <div className="w-full h-[200px] bg-accent p-6 flex flex-col justify-between">

                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-secondary flex">
                                        {order.orderID}
                                    </h1>
                                    <p className="text-sm text-white/80 mt-1">
                                        {getFormattedDate(order.date)}
                                    </p>
                                </div>

                                <button
                                onClick={()=>setIsVisible(false)}
                                className="w-[36px] h-[36px] text-white text-lg font-bold hover:bg-red-500 rounded-full text-lg font-bold transition cursor-pointer">
                                    ✕
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-3">

                                <div className="flex flex-col items-start text-left">
                                    <h1 className="text-lg font-semibold text-white">
                                        {order.firstName+" "+order.lastName}
                                    </h1>
                                    <p className="text-sm text-white/90 mt-1 break-all">
                                        {order.email}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-semibold text-white">
                                        Total: {getFormattedPrice(order.total)}
                                    </p>

                                    {/* Colored Status Badge */}
                                    <span className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(status)}`}>
                                        {status}
                                    </span>
                                </div>

                            </div>
                        </div>


                        {/* STATUS CONTROL */}
                        <div className="px-6 py-3 border-b flex items-center justify-between bg-gray-50">

                            <span className="text-sm font-semibold text-secondary">
                                Update Order Status
                            </span>

                            <select
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                            className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">

                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Completed</option>
                                <option>Cancelled</option>

                            </select>

                        </div>


                        {/* ORDER ITEMS */}
                        <div className="w-full h-[380px] p-6 overflow-y-auto bg-gray-50">

                            <h2 className="text-md font-semibold text-secondary mb-4">
                                Order Items
                            </h2>

                            {
                                order.items.map(
                                    (item)=>{
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
                                    }
                                )
                            }

                        </div>

                    </div>

                </div>
            )
        }

        </>
    )
}
