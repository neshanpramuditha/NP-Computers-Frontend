import axios from "axios"
import { useEffect, useState } from "react"

import toast from "react-hot-toast"

import CustomerViewOrderInfoModel from "../src/components/customersViewOrderInfoModel"
import getFormattedDate from "./utils/dateFormat"
import getFormattedPrice from "./utils/price-format"
import LoadingAnimation from "../src/components/loadingAnimation"

export default function MyOrdersPage(){

    const [orders, setOrders] = useState([])
    const [pageNumber, setPageNumbers] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        if(!isLoaded){
            const token = localStorage.getItem("token")

            axios.get(`${import.meta.env.VITE_API_URL}/orders/${pageSize}/${pageNumber}`,{
                headers:{
                    Authorization: "Bearer " + token
                }
            }).then((response)=>{
                setOrders(response.data.orders)
                setTotalPages(response.data.totalPages)
                setIsLoaded(true)
            })
        }
    },[isLoaded,pageNumber,pageSize])

    return(
        <div className="w-full h-full overflow-hidden">

            <div className="p-6 bg-primary min-h-screen">

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">

                    {/* Header */}
                    <div className="px-6 py-4 bg-secondary text-white flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Orders List</h2>

                        <span className="bg-accent px-3 py-1 rounded-full text-sm">
                            Page {pageNumber} / {totalPages}
                        </span>
                    </div>

                    {/* Table Container */}
                    <div className="max-h-[500px] overflow-auto">

                        {!isLoaded ?

                        <div className="w-full h-[300px] flex justify-center items-center">
                            <LoadingAnimation/>
                        </div>

                        :

                        <table className="min-w-full text-sm text-left">

                            {/* Table Head */}
                            <thead className="bg-primary text-secondary uppercase text-sm sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y">

                                {orders.map((order,index)=>(
                                    <tr key={order.orderID || index} className="hover:bg-primary/40 transition">

                                        <td className="px-6 py-4 font-semibold text-secondary">
                                            {order.orderID}
                                        </td>

                                        <td className="px-6 py-4">
                                            {order.firstName+" "+order.lastName || "N/A"}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {order.email}
                                        </td>

                                        <td className="px-6 py-4 text-accent font-semibold">
                                            {getFormattedPrice(order.total)}
                                        </td>

                                        <td className="px-6 py-4">
                                            {order.items?.length || 0}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                                {order.status || "Completed"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {getFormattedDate(order.date)}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <CustomerViewOrderInfoModel order={order}/>
                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                        }

                    </div>

                    {/* Pagination with Page Size Dropdown */}
                    <div className="flex justify-between items-center px-6 py-4 sticky bg-accent/40">

                        {/* Previous Button */}
                        <button
                            onClick={() => {
                                if(pageNumber > 1){
                                    setPageNumbers(pageNumber - 1)
                                    setIsLoaded(false)
                                }
                                else{
                                    toast.success("You are already on the first page!")
                                }
                            }}
                            className="w-[100px] px-4 py-2 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 hover:text-secondary"
                        >
                            Previous
                        </button>

                        {/* Page Info and Page Size Selector */}
                        <div className="flex items-center gap-4 text-secondary font-medium">
                            <span>
                                Page {pageNumber} of {totalPages}
                            </span>

                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value))
                                    setPageNumbers(1) // reset to first page when page size changes
                                    setIsLoaded(false)
                                }}
                                className="bg-white text-gray-800 px-3 py-1 rounded-sm"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={50}>50 per page</option>
                            </select>
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => {
                                if(pageNumber < totalPages){
                                    setPageNumbers(pageNumber + 1)
                                    setIsLoaded(false)
                                }
                                else{
                                    toast.success("You are on the last page!")
                                }
                            }}
                            className="w-[100px] px-4 py-2 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 hover:text-secondary"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}