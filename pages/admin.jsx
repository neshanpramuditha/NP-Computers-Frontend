import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-full border-4 border-blue-400 flex">
            <div className="w-[300px] h-full bg-amber-700 flex flex-col">
                <Link to="/admin/">Orders</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>

            </div>
            <div className="w-[calc(100%-300px)] h-full bg-amber-300 ">
            {/* calc එකෙන් අපිට function එකක් ලියාගන්න පුළුවන් width එක calculate කරගන්න මෙහෙම
            300px ක් දුබුරු කොටුව ආවම අනිත් කොටුව page එකේ සම්පුර්ණ ඉඩ ගන්නවා එතකොට.
            මේක flex-1 කියල දීල කරනවට වඩා සාර්ථකයි */}
                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>} />
                    <Route path="/products" element={<h1>Products Page</h1>} />
                    <Route path="/users" element={<h1>Users Page</h1>} />
                </Routes>
            </div>
        </div>
    )
}