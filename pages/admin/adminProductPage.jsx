import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-format";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import LoadingAnimation from "../../src/components/loadingAnimation";
import DeleteModel from "../../src/components/deleteModel";

export default function AdminProductPage(){

    const[products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(
      
      ()=>{
        if(loading){
            const token = localStorage.getItem("token");
    
    axios.get(import.meta.env.VITE_API_URL + "/products" ,{
        headers: {
            Authorization: "Bearer " + token
        }
    }).then((response) => {
        setProducts(response.data);
        setLoading(false);
    });
  }
      }, [loading])

    return(
        <div className="w-full h-full overflow-hidden">
          <div className="p-6 bg-primary min-h-screen">
  <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">

    {/* Header */}
    <div className="px-6 py-4 bg-secondary text-white flex justify-between items-center">
      <h2 className="text-xl font-semibold">Product List</h2>
      <span className="bg-accent px-3 py-1 rounded-full text-sm">
        {products.length} Products
      </span>
    </div>

    {/* Scrollable Table */}
    <div className="max-h-[500px] overflow-y-scroll overflow-x-scroll hide-scroll-track">

      {loading ?
      <div className="w-full h-full flex justify-center items-center"><LoadingAnimation/>
      </div> : 
      <table className="min-w-full text-sm text-left">

        {/* Sticky Head */}
        <thead className="bg-primary text-secondary uppercase text-sm sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4">Product ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Labelled Price</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Visibility</th>
            <th className="px-6 py-4">Brand</th>
            <th className="px-6 py-4">Model</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y">
          {products.map((item, index) => (
            <tr
              key={item.productID || `product-${index}`}
              className="hover:bg-primary/40 transition"
            >
              <td className="px-6 py-4 font-medium text-secondary">
                {item.productID}
              </td>

              <td className="px-6 py-4 font-semibold">
                {item.name}
              </td>

              <td className="px-6 py-4 text-accent font-semibold">
                {getFormattedPrice(item.price)}
              </td>

              <td className="px-6 py-4 line-through text-gray-400">
                {getFormattedPrice(item.labelledPrice)}
              </td>

              <td className="px-6 py-4">
                <span className="bg-primary text-secondary px-3 py-1 rounded-full text-center text-xs">
                  {item.category || "Uncategorized"} 
                </span>
              </td>

              <td className="px-6 py-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border shadow-sm"
                />
              </td>

              <td className="px-6 py-4">
                {item.isVisible ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Visible
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                    Hidden
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-secondary whitespace-nowrap">
                {item.brand || <span className="text-secondary/40">N/A</span>}
                </td>

              <td className="px-6 py-4 text-secondary whitespace-nowrap">
                {item.model || <span className="text-secondary/40">N/A</span>}
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center items-center text-2xl gap-2">
                <Link to = "/admin/update-product" state = {item} className="hover:text-accent"><CiEdit/></Link>
                
                <DeleteModel products={item} setLoading={setLoading}/>
                </div>

              </td>
            </tr>
          ))}
        </tbody>

      </table>}

    </div>
  </div>
</div>
            <Link to = "/admin/add-product" className="text-white  bg-accent w-[50px] h-[50px] flex justify-center items-center rounded-[15px] hover:rounded-full fixed bottom-12 right-12">
                <FaPlus />
            </Link>
        </div>
    )

}