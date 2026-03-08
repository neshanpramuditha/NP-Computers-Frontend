import { Link, Route, Routes } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";

export default function AdminPage(){
    return(
        <div className="w-full h-full border-4 border-blue-400 bg-accent
         flex">
            <div className="w-[300px] h-full flex flex-col bg-accent text-white">
                <h1 className="text-2xl font-bold text-center py-5 border-b-4 border-blue-400">Admin Dashboard</h1>
                <Link to="/admin/" className = "flex w-full p-[10px] gap-3 items-center hover:bg-amber-50 hover:text-accent"> <FaRegListAlt/> Orders</Link>
                <Link to="/admin/products" className = "flex w-full p-[10px] gap-3 items-center hover:bg-amber-50 hover:text-accent"> <MdOutlineInventory/> Products</Link>
                <Link to="/admin/users" className = "flex w-full p-[10px] gap-3 items-center hover:bg-amber-50 hover:text-accent"> <FaUserFriends/> Users</Link>

            </div>
            <div className="w-[calc(100%-300px)] h-full border-8 border-accent rounded-[20px] bg-primary p-4">
            {/* calc එකෙන් අපිට function එකක් ලියාගන්න පුළුවන් width එක calculate කරගන්න මෙහෙම
            300px ක් දුබුරු කොටුව ආවම අනිත් කොටුව page එකේ සම්පුර්ණ ඉඩ ගන්නවා එතකොට.
            මේක flex-1 කියල දීල කරනවට වඩා සාර්ථකයි */}
                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>} />
                    <Route path="/products" element={<AdminProductPage/>} />
                    <Route path="/users" element={<h1>Users Page</h1>} />
                    <Route path ="/add-product" element={<AdminAddProductPage/>} /> 
                    <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
                </Routes>
            </div>
        </div>
    )
}