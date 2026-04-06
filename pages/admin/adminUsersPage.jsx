import axios from "axios"
import { useEffect, useState } from "react"
import LoadingAnimation from "../../src/components/loadingAnimation"
import toast from "react-hot-toast"

export default function AdminUsersPage(){

    const [users, setUsers] = useState([])
    const [pageNumber, setPageNumbers] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        if(!isLoaded){
            const token = localStorage.getItem("token")

            axios.get(import.meta.env.VITE_API_URL+"/users/all/"+pageSize+"/"+pageNumber,{
                headers:{
                    Authorization: "Bearer " + token
                }
            }).then((response)=>{
                setUsers(response.data.users)
                setTotalPages(response.data.totalPages)
                setIsLoaded(true)
            })
        }
    },[isLoaded,pageNumber,pageSize])

    return(
        <div className="w-full h-full overflow-hidden">

            <div className="p-1 bg-primary min-h-screen max-w-screen">

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">

                    {/* Header */}
                    <div className="px-6 py-4 bg-secondary text-white flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Manage Users List</h2>

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
                            <thead className="bg-primary text-secondary uppercase text-xs sticky top-0 z-10 text-center">
                                <tr>
                                    <th className="px-6 py-4"></th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">First Name</th>
                                    <th className="px-6 py-4">Last Name</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Email Verification</th>
                                    <th className="px-6 py-4">Account Status</th>
                                    <th className="px-6 py-4"></th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y">

                                {users.map((user)=>(
                                    <tr key={user.user} className="hover:bg-primary/40 transition">

                                        <td className="px-6 py-4">
                                            <img referrerPolicy="no-referrer" src={user.image} className="w-10 h-10 rounded-full object-cover" alt="User Image" />
                                        </td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.firstName}</td>
                                        <td className="px-6 py-4">{user.lastName}</td>
                                        <td className="px-6 py-4">{user.role}</td>
                                        <td className="px-6 py-4">{user.isEmailVerified ? "Verified" : "Not Verified"}</td>
                                        <td className="px-6 py-4">{user.isBlocked ? "Blocked" : "Active"}</td>

                                        <td className="px-6 py-4">
                                            
                                            {/* Block user button */}
                                            <button
                                            onClick={
                                                ()=>{
                                                    axios.post(import.meta.env.VITE_API_URL+"/users/toggle-block/", {
                                                        email:user.email
                                                    },{
                                                        headers:{
                                                            'Authorization': "Bearer "+localStorage.getItem("token")
                                                        }
                                                    }).then((response)=>{
                                                        toast.success(response.data.message)
                                                        setIsLoaded(false) // Refresh the user list after blocking/unblocking
                                                    }).catch(
                                                        (error)=>{
                                                            toast.error(error?.response?.data?.message || "An error occurred while toggling block status.")
                                                        }
                                                    )
                                                }
                                            }
                                            className={`${
                                                user.isBlocked 
                                                ? "bg-green-500 hover:bg-green-600" 
                                                : "bg-red-500 hover:bg-red-600"
                                                }
                                                 text-white px-4 py-2 rounded-md hover:cursor-pointer`}
                                                >
                                                {user.isBlocked ? "Unblock" : "Block"}
                                            </button>

                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Change role button */}
                                            <button
                                                onClick={
                                                ()=>{
                                                    axios.post(import.meta.env.VITE_API_URL+"/users/toggle-role/", {
                                                        email:user.email
                                                    },{
                                                        headers:{
                                                            'Authorization': "Bearer "+localStorage.getItem("token")
                                                        }
                                                    }).then((response)=>{
                                                        toast.success(response.data.message)
                                                        setIsLoaded(false) // Refresh the user list after blocking/unblocking
                                                    }).catch(
                                                        (error)=>{
                                                            toast.error(error?.response?.data?.message || "An error occurred while toggling block status.")
                                                        }
                                                     )
                                                   } 
                                                }                                           
                                                className={`text-white px-4 py-2 rounded-md hover:cursor-pointer ${
                                                user.role === "admin"
                                                ? "bg-gray-500 hover:bg-gray-600"
                                                : "bg-green-500 hover:bg-green-600"
                                                }`}
                                                >
                                            {user.role === "admin" ? "Make Customer" : "Make Admin"}
                                            </button>
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
                            className="w-[100px] px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-400 hover:text-secondary hover:cursor-pointer"
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
                            className="w-[100px] px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-400 hover:text-secondary hover:cursor-pointer"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}